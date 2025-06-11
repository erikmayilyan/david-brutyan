const express = require('express');
const Order = require('./orders.model');
const Product = require('../products/products.model');
const router = express.Router();
const nodemailer = require('nodemailer');
const axios = require('axios');
const crypto = require('crypto');
const https = require('https');

const agent = new https.Agent({
  rejectUnauthorized: true, 
  secureProtocol: 'TLS_method',
});

const getExchangeRate = async (baseCurrency = 'USD', targetCurrency = 'UAH') => {
  try {
    const response = await axios.get(`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/${baseCurrency}`);
    const exchangeRate = response.data.conversion_rates[targetCurrency];
    return exchangeRate;
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    throw new Error('Failed to fetch exchange rate');
  }
};

router.post('/create-checkout-session', async (req, res) => {
  const { products, fullName, province, deliveryMethod, email, address, phone, totalPrice, language = 'ua', warehouseNumber, userId } = req.body;

  try {
    console.log("Full request body:", req.body);
    console.log("Warehouse number from request:", warehouseNumber);
    console.log("User ID from request:", userId);

    if (!warehouseNumber) {
      console.log("Warning: warehouseNumber is missing from request");
    }

    const amount = totalPrice || products.reduce((total, product) => total + (product.price * product.quantity), 0);
    console.log("Amount:", amount);

    const amountInUAH = amount;
    console.log("Amount in UAH:", amountInUAH);

    const session_id = `order-${Math.random().toString(36).substr(2, 9)}`;
    const returnUrl = `/success?session_id=${session_id}`;
    const cancelUrl = `/${language}?cancel`;
    console.log("Session ID:", session_id);

    console.log("Products received:", JSON.stringify(products, null, 2));

    const productDetails = await Promise.all(
      products.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (!product) {
          throw new Error(`Product not found: ${item.productId}`);
        }
        return {
          ...item,
          name: product.name
        };
      })
    );

    console.log("Products with details:", JSON.stringify(productDetails, null, 2));

    const lineItems = productDetails.map((item) => {
      console.log("Processing product:", {
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        size: item.size,
        price: item.price
      });
      
      return {
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        size: item.size,
        price: item.price,
        total: item.price * item.quantity
      };
    });

    console.log("Line items created:", JSON.stringify(lineItems, null, 2));

    const orderData = {
      orderId: session_id,
      amount: amountInUAH,
      products: lineItems,
      fullName,
      address,
      phone,
      province,
      deliveryMethod,
      warehouseNumber: warehouseNumber || 'N/A',
      email,
      status: 'pending',
      status_ua: 'ОЧІКУВАННЯ',
      userId: userId || null
    };

    console.log("Order data before creation:", orderData);

    const order = new Order(orderData);
    console.log("Order object before save:", order.toObject());

    await order.save();
    console.log("Order after save:", order.toObject());

    // Create Fondy request without including userId in the signature generation
    const fondyRequest = {
      request: {
        order_id: session_id,
        merchant_id: process.env.FONDY_MERCHANT_ID,
        order_desc: 'Order Payment',
        amount: Math.round(parseFloat(amountInUAH) * 100), // Convert to cents
        currency: 'UAH',
        server_callback_url: 'https://e530-194-230-146-4.ngrok-free.app/api/orders/fondy-callback',
        response_url: returnUrl,
        sender_email: email,
        sender_first_name: fullName.split(' ')[0],
        sender_last_name: fullName.split(' ').slice(1).join(' ') || ' ',
        sender_phone: phone.replace(/\D/g, ''), // Remove all non-digit characters
        sender_address: address,
        sender_city: province,
        sender_country_code: 'UA'
      }
    };

    // Log the raw values before signature generation
    console.log('Raw values for signature:', {
      secretKey: process.env.FONDY_SECRET_KEY,
      amount: fondyRequest.request.amount,
      currency: fondyRequest.request.currency,
      merchantId: fondyRequest.request.merchant_id,
      orderDesc: fondyRequest.request.order_desc,
      orderId: fondyRequest.request.order_id,
      responseUrl: fondyRequest.request.response_url,
      senderAddress: fondyRequest.request.sender_address,
      senderCity: fondyRequest.request.sender_city,
      senderEmail: fondyRequest.request.sender_email,
      senderFirstName: fondyRequest.request.sender_first_name,
      senderLastName: fondyRequest.request.sender_last_name,
      senderPhone: fondyRequest.request.sender_phone,
      serverCallbackUrl: fondyRequest.request.server_callback_url
    });

    // Generate signature string exactly as Fondy expects it
    const signatureString = [
      process.env.FONDY_SECRET_KEY,
      fondyRequest.request.amount,
      fondyRequest.request.currency,
      fondyRequest.request.merchant_id,
      fondyRequest.request.order_desc,
      fondyRequest.request.order_id,
      fondyRequest.request.response_url,
      fondyRequest.request.sender_address,
      fondyRequest.request.sender_city,
      fondyRequest.request.sender_email,
      fondyRequest.request.sender_first_name,
      fondyRequest.request.sender_last_name,
      fondyRequest.request.sender_phone,
      fondyRequest.request.server_callback_url
    ].map(value => {
      // Ensure all values are strings and handle null/undefined
      if (value === null || value === undefined) return ' ';
      return String(value).trim() || ' ';
    }).join('|');

    console.log('Final signature string:', signatureString);

    // Generate signature using SHA1
    const signature = crypto
      .createHash('sha1')
      .update(signatureString)
      .digest('hex');

    console.log('Generated signature:', signature);

    // Add signature to request
    fondyRequest.request.signature = signature;

    // Send request to Fondy
    const fondyResponse = await axios.post('https://api.fondy.eu/api/checkout/url', fondyRequest, {
      headers: {
        'Content-Type': 'application/json',
      },
      httpsAgent: agent
    });

    console.log("Fondy Response:", fondyResponse.data);

    if (fondyResponse.data.response && fondyResponse.data.response.checkout_url) {
      res.json({ 
        url: fondyResponse.data.response.checkout_url, 
        session_id: session_id 
      });
    } else {
      console.error("Fondy Error Response:", fondyResponse.data);
      throw new Error(fondyResponse.data.response?.error_message || 'Failed to create Fondy checkout session');
    }

  } catch (error) {
    console.error("Error creating Fondy checkout session:", error.response?.data || error.message);
    res.status(500).send({ 
      message: "Failed to create Fondy checkout session",
      error: error.response?.data || error.message 
    });
  }
});

// Add Fondy callback endpoint
router.post('/fondy-callback', async (req, res) => {
  console.log('=== FONDY CALLBACK RECEIVED ===');
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  console.log('Query:', req.query);
  console.log('Raw Body:', req.rawBody);
  console.log('=============================');

  const { order_id, order_status, signature } = req.body;
  
  if (!order_id || !order_status) {
    console.log('Missing required fields:', { order_id, order_status });
    return res.status(400).json({ error: "Missing required fields" });
  }

  console.log('Fondy callback received:', { 
    order_id, 
    order_status,
    signature,
    body: req.body 
  });

  // Verify signature using Fondy's response_signature_string
  const signatureString = [
    process.env.FONDY_SECRET_KEY,
    req.body.amount,
    req.body.currency,
    req.body.additional_info,
    req.body.actual_amount,
    req.body.approval_code,
    req.body.card_bin,
    req.body.card_type,
    req.body.currency,
    req.body.eci,
    req.body.masked_card,
    req.body.merchant_id,
    req.body.order_id,
    req.body.order_status,
    req.body.order_time,
    req.body.payment_id,
    req.body.payment_system,
    req.body.response_status,
    req.body.reversal_amount,
    req.body.rrn,
    req.body.sender_email,
    req.body.settlement_amount,
    req.body.tran_type
  ].join('|');

  const expectedSignature = crypto
    .createHash('sha1')
    .update(signatureString)
    .digest('hex');

  console.log('Signature verification:', {
    received: signature,
    expected: expectedSignature,
    matches: signature === expectedSignature,
    signatureString: signatureString
  });

  if (signature !== expectedSignature) {
    console.log('Invalid signature received');
    return res.status(400).json({ error: "Invalid signature" });
  }

  try {
    let order = await Order.findOne({ orderId: order_id });
    console.log('Found order:', { 
      found: order ? 'yes' : 'no',
      orderId: order_id,
      orderDetails: order ? {
        status: order.status,
        email: order.email,
        amount: order.amount
      } : null
    });
    
    if (order) {
      // Update order status based on payment status
      if (order_status === "approved") {
        console.log('Payment successful, updating order status');
        order.status = 'pending';
        order.status_ua = 'ОЧІКУВАННЯ';
        await order.save();

        // Send admin email notification
        console.log('Attempting to send admin email...');
        console.log('Email configuration:', {
          service: 'gmail',
          user: process.env.EMAIL_USER,
          hasPassword: !!process.env.EMAIL_PASS,
          host: 'smtp.gmail.com',
          port: 587
        });

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          },
          tls: {
            rejectUnauthorized: false
          },
          debug: true,
          logger: true
        });

        // Verify SMTP connection
        try {
          await transporter.verify();
          console.log('SMTP connection verified successfully');
        } catch (verifyError) {
          console.error('SMTP connection verification failed:', {
            error: verifyError,
            message: verifyError.message,
            code: verifyError.code
          });
        }

        const orderItemsHtml = order.products.map(p => {
          console.log('Processing product for email:', {
            productId: p.productId,
            name: p.name,
            quantity: p.quantity,
            size: p.size,
            price: p.price
          });
          return `
            <tr>
              <td>${p.productId}</td>
              <td>${p.name || 'N/A'}</td>
              <td>${p.quantity}</td>
              <td>${p.size || 'N/A'}</td>
              <td>${p.price || 'N/A'} грн</td>
              <td>${(p.price * p.quantity) || 'N/A'} грн</td>
            </tr>
          `;
        }).join("");

        const adminEmailHtml = `
          <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #d35400;">Отримано нове замовлення</h2>
            <p>Нове замовлення було розміщено.</p>
            <h3>Деталі замовлення</h3>
            <p><strong>ID замовлення:</strong> ${order_id}</p>
            <p><strong>Клієнт:</strong> ${order.fullName}</p>
            <p><strong>Email:</strong> ${order.email}</p>
            <p><strong>Метод доставки:</strong> ${order.deliveryMethod}</p>
            <p><strong>Номер склада:</strong> ${order.warehouseNumber || 'N/A'}</p>
            <p><strong>Адреса:</strong> ${order.address}</p>
            <p><strong>Телефон:</strong> ${order.phone}</p>
            <p><strong>Область:</strong> ${order.province}</p>
            <p><strong>Загальна сума:</strong> ${order.amount} грн</p>
            <h3>Замовлені товари:</h3>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <thead>
                <tr style="background-color: #f5f5f5;">
                  <th style="padding: 8px; border: 1px solid #ddd;">ID товару</th>
                  <th style="padding: 8px; border: 1px solid #ddd;">Назва</th>
                  <th style="padding: 8px; border: 1px solid #ddd;">Кількість</th>
                  <th style="padding: 8px; border: 1px solid #ddd;">Розмір</th>
                  <th style="padding: 8px; border: 1px solid #ddd;">Ціна</th>
                  <th style="padding: 8px; border: 1px solid #ddd;">Всього</th>
                </tr>
              </thead>
              <tbody>
                ${orderItemsHtml}
              </tbody>
            </table>
          </div>
        `;

        const adminEmailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
          subject: 'Нове замовлення на Mildo Shoes',
          html: adminEmailHtml
        };

        try {
          console.log('Sending email with options:', {
            from: adminEmailOptions.from,
            to: adminEmailOptions.to,
            subject: adminEmailOptions.subject
          });
          
          const info = await transporter.sendMail(adminEmailOptions);
          console.log('Admin email sent successfully:', {
            messageId: info.messageId,
            response: info.response
          });
        } catch (emailError) {
          console.error('Error sending admin email:', {
            error: emailError,
            message: emailError.message,
            code: emailError.code,
            response: emailError.response,
            stack: emailError.stack
          });
          // Continue with order processing even if email fails
        }

        res.status(200).json({ status: 'ok' });
      } else {
        console.log('Payment not successful:', order_status);
        order.status = 'failed';
        order.status_ua = 'ПОМИЛКА';
        await order.save();
        res.status(500).json({ error: "Failed to process callback" });
      }
    } else {
      console.log('Order not found:', order_id);
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    console.error('Error processing Fondy callback:', {
      error: error,
      message: error.message,
      stack: error.stack
    });
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/confirm-payment", async (req, res) => {
  try {
    const { session_id } = req.body;
    console.log('Confirm payment received for session:', session_id);
    
    if (!session_id) {
      console.log('No session_id provided');
      return res.status(400).json({ error: "session_id is required" });
    }

    let order = await Order.findOne({ orderId: session_id });
    console.log('Found order:', order ? 'yes' : 'no');

    if (!order) {
      console.log('Order not found');
      return res.status(404).json({ error: "Order not found" });
    }

    // Update order status and send emails
    console.log('Updating order status and sending emails...');
    order.status = 'pending';
    order.status_ua = 'ОЧІКУВАННЯ';
    await order.save();

    // Send admin email notification
    console.log('Attempting to send admin email...');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const orderItemsHtml = order.products.map(p => `
      <tr>
        <td>${p.productId}</td>
        <td>${p.quantity}</td>
        <td>${p.size || 'N/A'}</td>
        <td>${p.price || 'N/A'} грн</td>
        <td>${(p.price * p.quantity) || 'N/A'} грн</td>
      </tr>
    `).join("");

    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #d35400;">Отримано нове замовлення</h2>
        <p>Нове замовлення було розміщено.</p>
        <h3>Деталі замовлення</h3>
        <p><strong>ID замовлення:</strong> ${session_id}</p>
        <p><strong>Клієнт:</strong> ${order.fullName}</p>
        <p><strong>Email:</strong> ${order.email}</p>
        <p><strong>Delivery Method:</strong> ${order.deliveryMethod}</p>
        <p><strong>Address:</strong> ${order.address}</p>
        <p><strong>Phone:</strong> ${order.phone}</p>
        <p><strong>Province:</strong> ${order.province}</p>
        <p><strong>Загальна сума:</strong> ${order.amount} грн</p>
        <h3>Замовлені товари:</h3>
        <table border="1" cellspacing="0" cellpadding="5" style="width:100%; border-collapse: collapse;">
          <tr style="background-color: #f2f2f2;">
            <th>ID продукту</th>
            <th>Кількість</th>
            <th>Розмір</th>
            <th>Ціна за одиницю</th>
            <th>Загальна ціна</th>
          </tr>
          ${orderItemsHtml}
        </table>
      </div>
    `;

    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #27ae60;">Дякуємо за ваше замовлення, ${order.fullName}!</h2>
        <p>Ваше замовлення успішно оформлено.</p>
        <h3>Деталі замовлення</h3>
        <p><strong>ID замовлення:</strong> ${session_id}</p>
        <p><strong>Загальна сума:</strong> ${order.amount} грн</p>
        <h3>Замовлені товари:</h3>
        <table border="1" cellspacing="0" cellpadding="5" style="width:100%; border-collapse: collapse;">
          <tr style="background-color: #f2f2f2;">
            <th>ID продукту</th>
            <th>Кількість</th>
            <th>Розмір</th>
            <th>Ціна за одиницю</th>
            <th>Загальна ціна</th>
          </tr>
          ${orderItemsHtml}
        </table>
        <p>Ми повідомимо вас, коли ваше замовлення буде оброблено.</p>
        <p style="color: #7f8c8d;">Дякуємо, що обрали нас!</p>
      </div>
    `;

    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'New Order Received',
      html: adminEmailHtml
    };

    const customerMailOptions = {
      from: process.env.EMAIL_USER,
      to: order.email,
      subject: 'Order Confirmation',
      html: customerEmailHtml
    };

    try {
      console.log('Sending emails...');
      await transporter.sendMail(adminMailOptions);
      await transporter.sendMail(customerMailOptions);
      console.log('Emails sent successfully');
    } catch (error) {
      console.error('Error sending emails:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        response: error.response,
        stack: error.stack
      });
    }

    res.json({ order });
  } catch (error) {
    console.error("Error confirming payment: ", error);
    res.status(500).json({ error: "Failed to confirm payment" });
  }
});

router.get('/:email', async (req, res) => {
  const email = req.params.email;
  if (!email) {
    return res.status(400).send({ message: "Email Is Required!" });
  };
  try {
    const orders = await Order.find({ email: email });
    if (orders.length === 0 || !orders) {
      return res.status(400).send({ order: 0, message: "No Orders Found For This Email" });
    };
    res.status(200).send({ orders });
  } catch (error) {
    console.error("Error Fetching Orders by Email", error);
    res.status(500).send({ message: "Failed To Fetch Orders By Email" });
  };
});

router.get('/order/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).send({ message: "Order Not Found" });
    };
    res.status(200).send(order);
  } catch (error) {
    console.error("Error Fetching Orders By User Id", error);
    res.status(500).send({ message: "Failed To Fetch Orders By User Id" });
  }
});

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    if (orders.length === 0) {
      return res.status(404).send({ message: "No Orders Found", orders: [] });
    };
    res.status(200).send(orders);
  } catch (error) {
    console.error("Error Fetching All Orders");
    res.status(500).send({ message: "Failed To Fetch All Orders" });
  }
});

router.patch('/update-order-status/:id', async (req, res) => {
  const { id } = req.params;
  const { status_ua } = req.body;
  const validStatuses = ['ОЧІКУВАННЯ', 'ОБРОБКА', 'ВІДПРАВЛЕНО', 'ЗАВЕРШЕНО'];  
  if (!status_ua || !validStatuses.includes(status_ua)) {
    return res.status(400).send({ message: "Status Is Required" });
  };
  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, {
      status_ua,
      updatedAt: new Date()
    }, {
      new: true,
      runValidators: true
    });
    if (!updatedOrder) {
      return res.status(404).send({ message: "Order Not Found" });
    };
    res.status(200).json({
      message: "Order Status Updated Successfully",
      order: updatedOrder
    });
  } catch (error) {
    console.error("Error Updating Order Status", error);
    res.status(500).send({ message: "Failed To Update Order Status" });
  };
});

router.delete('/delete-order/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).send({ message: "Order Not Found" });
    };
    res.status(200).json({
      message: "Order Deleted Successfully",
      order: deletedOrder
    })
  } catch (error) {
    console.error("Error Deleting Order", error);
    res.status(500).send({ message: "Failed to Delete Order "});
  }
});

router.get('/test-email', async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      debug: true,
      logger: true
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'Test Email',
      text: 'This is a test email to verify the email configuration.',
      html: '<h1>Test Email</h1><p>This is a test email to verify the email configuration.</p>'
    };

    console.log('Attempting to send test email...');
    console.log('Email configuration:', {
      service: 'gmail',
      user: process.env.EMAIL_USER,
      hasPassword: !!process.env.EMAIL_PASS
    });

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info);
    res.json({ 
      message: 'Test email sent successfully',
      info: info
    });
  } catch (error) {
    console.error('Error sending test email:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      response: error.response,
      stack: error.stack
    });
    res.status(500).json({ 
      message: 'Failed to send test email',
      error: error.message,
      details: {
        code: error.code,
        response: error.response
      }
    });
  }
});

router.get('/test-callback', (req, res) => {
  console.log('Test callback received');
  res.json({ status: 'ok', message: 'Callback endpoint is working' });
});

router.post('/test-email-send', async (req, res) => {
  console.log('Testing email sending...');
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      },
      debug: true,
      logger: true
    });

    console.log('Email configuration:', {
      service: 'gmail',
      user: process.env.EMAIL_USER,
      hasPassword: !!process.env.EMAIL_PASS
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'Test Email from Fondy Integration',
      html: '<h1>Test Email</h1><p>This is a test email to verify the email configuration is working.</p>'
    };

    console.log('Sending test email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('Test email sent successfully:', info);
    res.json({ 
      success: true, 
      message: 'Test email sent successfully',
      info: info 
    });
  } catch (error) {
    console.error('Error sending test email:', {
      error: error,
      message: error.message,
      code: error.code,
      response: error.response,
      stack: error.stack
    });
    res.status(500).json({ 
      success: false,
      error: error.message,
      details: {
        code: error.code,
        response: error.response
      }
    });
  }
});

module.exports = router;
