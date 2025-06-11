import React from 'react';
import { useLocation } from 'react-router';
import { useLanguage } from '../../LanguageContext';
import './TermsConditions.css';

const TermsConditions = () => {
  const { language } = useLanguage();

  return (
    <div className="terms-container">
      <h1>{language === "ua" ? "УМОВИ ВИКОРИСТАННЯ" : language === "ru" ? "УСЛОВИЯ ИСПОЛЬЗОВАНИЯ" : "TERMS OF USE"}</h1>
      
      <div className="terms-section">
        <h2>{language === "ua" ? "Умови обміну та повернення" : language === "ru" ? "Условия обмена и возврата" : "Exchange and Return Conditions"}</h2>
        <p>
          {language === "ua" 
            ? "Ми прагнемо, щоб ви залишалися задоволені кожною покупкою, тому надаємо можливість обміну або повернення товару протягом 14 календарних днів з моменту отримання замовлення."
            : language === "ru"
              ? "Мы стремимся к тому, чтобы вы оставались довольны каждой покупкой, поэтому предоставляем возможность обмена или возврата товара в течение 14 календарных дней с момента получения заказа."
              : "We strive to ensure your satisfaction with every purchase, therefore we provide the opportunity to exchange or return items within 14 calendar days from the date of order receipt."}
        </p>
        <p>
          {language === "ua"
            ? "Компанія здійснює повернення і обмін товарів належної якості відповідно до Закону «Про захист прав споживачів». (http://zakon2.rada.gov.ua/laws/show/1023-12)"
            : language === "ru"
              ? "Компания осуществляет возврат и обмен товаров надлежащего качества в соответствии с Законом «О защите прав потребителей». (http://zakon2.rada.gov.ua/laws/show/1023-12)"
              : "The company processes returns and exchanges of goods of proper quality in accordance with the Law 'On Consumer Rights Protection'. (http://zakon2.rada.gov.ua/laws/show/1023-12)"}
        </p>
      </div>

      <div className="terms-section">
        <h2>{language === "ua" ? "Умови для обміну/повернення" : language === "ru" ? "Условия для обмена/возврата" : "Conditions for Exchange/Return"}</h2>
        <ul>
          <li>
            {language === "ua"
              ? "товар не був у використанні"
              : language === "ru"
                ? "товар не был в использовании"
                : "item has not been used"}
          </li>
          <li>
            {language === "ua"
              ? "збережено товарний вигляд, оригінальну упаковку та всі бірки"
              : language === "ru"
                ? "сохранен товарный вид, оригинальная упаковка и все бирки"
                : "item's appearance, original packaging, and all tags are preserved"}
          </li>
          <li>
            {language === "ua"
              ? "наявний документ, що підтверджує покупку (електронний чек, повідомлення тощо)"
              : language === "ru"
                ? "наличие документа, подтверждающего покупку (электронный чек, сообщение и т.д.)"
                : "proof of purchase document is available (electronic receipt, message, etc.)"}
          </li>
        </ul>
      </div>

      <div className="terms-section">
        <h2>{language === "ua" ? "Як оформити повернення чи обмін" : language === "ru" ? "Как оформить возврат или обмен" : "How to Process Return or Exchange"}</h2>
        <p>
          {language === "ua"
            ? "Обміни та повернення відправляти на: М. Київ, НП відділення 202, +380 (67) 392 37 21 Дармороз Віра Василівна"
            : language === "ru"
              ? "Отправлять обмены и возвраты на: г. Киев, НП отделение 202, +380 (67) 392 37 21 Дармороз Вера Васильевна"
              : "Send exchanges and returns to: Kyiv, NP Department 202, +380 (67) 392 37 21 Darmoroz Vira Vasylivna"}
        </p>
        <p>
          {language === "ua"
            ? "Після надсилання напишіть нам номер ттн у телеграмі 0673923721, Instagram @mildo_shoes чи зателефонуйте"
            : language === "ru"
              ? "После отправки напишите нам номер ттн в телеграме 0673923721, Instagram @mildo_shoes или позвоните"
            : "After sending, write us the tracking number in Telegram 0673923721, Instagram @mildo_shoes or call"}
        </p>
        <p>
          {language === "ua"
            ? "Обмін/повернення моделі займе до 3х робочих днів після отримання нами посилки та перевірки повернення на відсутність слідів носіння"
            : language === "ru"
              ? "Обмен/возврат модели займет до 3 рабочих дней после получения нами посылки и проверки возврата на отсутствие следов ношения"
            : "Exchange/return of the model will take up to 3 working days after we receive the package and check the return for absence of wear marks"}
        </p>
        <p>
          {language === "ua"
            ? "Зверніть увагу: витрати на доставку повернення/обміну оплачує покупець (крім випадків, коли товар має виробничий брак); обмін здійснюється за наявності потрібного розміру на складі."
            : language === "ru"
              ? "Обратите внимание: расходы на доставку возврата/обмена оплачивает покупатель (кроме случаев, когда товар имеет производственный брак); обмен осуществляется при наличии нужного размера на складе."
            : "Please note: return/exchange shipping costs are paid by the buyer (except in cases where the item has a manufacturing defect); exchange is made subject to availability of the required size in stock."}
        </p>
      </div>

      <div className="terms-section">
        <h2>{language === "ua" ? "Публічна оферта" : language === "ru" ? "Публичная оферта" : "Public Offer"}</h2>
        <p>
          {language === "ua"
            ? "Цей документ є офіційною публічною пропозицією (офертою) Інтернет-магазину щодо укладення договору купівлі-продажу товарів, представлених на сайті."
            : language === "ru"
              ? "Этот документ является официальной публичной офертой интернет-магазина о заключении договора купли-продажи товаров, представленных на сайте."
            : "This document is an official public offer of the online store for the conclusion of a sales contract for goods presented on the website."}
        </p>
        <h3>{language === "ua" ? "1. Загальні положення" : language === "ru" ? "1. Общие положения" : "1. General Provisions"}</h3>
        <p>
          {language === "ua"
            ? "1.1. Ця оферта є офіційною пропозицією Продавця, адресованою будь-якій дієздатній фізичній особі, укласти договір купівлі-продажу товару дистанційним способом."
            : language === "ru"
              ? "1.1. Эта оферта является официальным предложением Продавца, адресованным любому дееспособному физическому лицу, заключить договор купли-продажи товара дистанционным способом."
            : "1.1. This offer is an official proposal of the Seller, addressed to any capable individual, to conclude a sales contract for goods remotely."}
        </p>
        <p>
          {language === "ua"
            ? "1.2. Акцепт (прийняття) цієї оферти — оформлення замовлення на сайті або через Instagram-магазин — є підтвердженням згоди Покупця з усіма умовами цієї оферти."
            : language === "ru"
              ? "1.2. Акцепт (принятие) этой оферты — оформление заказа на сайте или через Instagram-магазин — является подтверждением согласия Покупателя со всеми условиями этой оферты."
            : "1.2. Acceptance of this offer — placing an order on the website or through Instagram store — is confirmation of the Buyer's agreement with all terms of this offer."}
        </p>
      </div>

      <div className="terms-section">
        <h2>{language === "ua" ? "Гарантія від Mildo" : language === "ru" ? "Гарантия от Mildo" : "Mildo Warranty"}</h2>
        <p>
          {language === "ua"
            ? "Що є виробничим браком чи дефектом взуття. Умови експлуатації та гарантії."
            : language === "ru"
              ? "Что является производственным браком или дефектом обуви. Условия эксплуатации и гарантии."
            : "What constitutes a manufacturing defect or footwear defect. Operating conditions and warranty."}
        </p>
        <p>
          {language === "ua"
            ? "Гарантійний термін 60 днів. Усі умови гарантії відповідають вимогам Закону «Про захист прав споживачів» та нормативним документам (ГОСТ ДСТУ). Взуття відповідає вимогам нормативно-технічної документації: ― ТУУ 00308169-03-99 та ТУУ 00308169-09-2000."
            : language === "ru"
              ? "Гарантийный срок 60 дней. Все условия гарантии соответствуют требованиям Закона «О защите прав потребителей» и нормативным документам (ГОСТ ДСТУ). Обувь соответствует требованиям нормативно-технической документации: ― ТУУ 00308169-03-99 и ТУУ 00308169-09-2000."
            : "Warranty period is 60 days. All warranty conditions comply with the requirements of the Law 'On Consumer Rights Protection' and regulatory documents (GOST DSTU). The footwear meets the requirements of regulatory and technical documentation: ― TUU 00308169-03-99 and TUU 00308169-09-2000."}
        </p>
      </div>

      <div className="terms-section">
        <h2>{language === "ua" ? "Умови експлуатації та догляду" : language === "ru" ? "Условия эксплуатации и ухода" : "Operating and Care Conditions"}</h2>
        <p>
          {language === "ua"
            ? "1. Вибираючи взуття, зверніть увагу на відповідність обраної моделі до параметрів вашої стопи. Взуття не повинно стискати по повноті та довжині. При невідповідності розміру устілки та повноти може статися деформація взуття, розрив верхньої частини, розриви швів або поява тріщин і заломів."
            : language === "ru"
              ? "1. Выбирая обувь, обратите внимание на соответствие выбранной модели параметрам вашей стопы. Обувь не должна сжимать по полноте и длине. При несоответствии размера стельки и полноты может произойти деформация обуви, разрыв верхней части, разрывы швов или появление трещин и заломов."
            : "1. When choosing footwear, pay attention to the correspondence of the selected model to your foot parameters. The footwear should not compress in width and length. If the insole size and width do not match, deformation of the footwear, upper part rupture, seam breaks, or cracks and creases may occur."}
        </p>
        <p>
          {language === "ua"
            ? "2. Після кожного носіння взуття потрібно делікатно очищати від забруднень (згідно з типом верху) і просушувати від вологи при кімнатній температурі вдалині від опалювальних приладів попередньо набивши її зім'ятим папером, щоб уникнути деформації верху виробу."
            : language === "ru"
              ? "2. После каждого ношения обувь нужно деликатно очищать от загрязнений (согласно типу верха) и просушивать от влаги при комнатной температуре вдали от отопительных приборов, предварительно набив её смятым бумагой, чтобы избежать деформации верха изделия."
            : "2. After each wear, the footwear should be gently cleaned of dirt (according to the upper type) and dried from moisture at room temperature away from heating devices, having previously stuffed it with crumpled paper to avoid deformation of the product's upper."}
        </p>
        <p>
          {language === "ua"
            ? "3. Перед використанням взуття потрібно захистити за допомогою крему для шкіри або спеціального водовідштовхувального засобу. Щоб взуття тривалий час зберігало новий зовнішній вигляд, не промокало і не втрачало форму, регулярно використовуйте спеціальні засоби догляду за взуттям водовідштовхувальні, щоб уникнути появи білих сольових плям і засоби для збереження кольору."
            : language === "ru"
              ? "3. Перед использованием обувь нужно защитить с помощью крема для кожи или специального водоотталкивающего средства. Чтобы обувь долгое время сохраняла новый внешний вид, не промокала и не теряла форму, регулярно используйте специальные водоотталкивающие средства по уходу за обувью, чтобы избежать появления белых солевых пятен и средства для сохранения цвета."
            : "3. Before using the footwear, protect it with leather cream or a special water-repellent agent. To keep the footwear looking new for a long time, not getting wet and not losing its shape, regularly use special water-repellent footwear care products to avoid white salt stains and color preservation products."}
        </p>
      </div>

      <div className="terms-section">
        <h2>{language === "ua" ? "Брак у взутті" : language === "ru" ? "Брак в обуви" : "Footwear Defects"}</h2>
        <p>
          {language === "ua"
            ? "Брак у взутті ― основні виявлені дефекти виробничого характеру, наслідком якого не можна використовувати взуття за призначенням. Будь-яка невідповідність цьому стандарту вважається дефектом або виробничим браком."
            : language === "ru"
              ? "Брак в обуви ― основные выявленные дефекты производственного характера, вследствие которых нельзя использовать обувь по назначению. Любое несоответствие этому стандарту считается дефектом или производственным браком."
            : "Footwear defects ― main identified defects of a manufacturing nature, as a result of which the footwear cannot be used for its intended purpose. Any non-compliance with this standard is considered a defect or manufacturing defect."}
        </p>
        <ul>
          <li>
            {language === "ua"
              ? "повинне бути наскрізне пошкодження деталей, розтріскування, відшаровування і липкість покривної плівки матеріалу верху і підкладки"
              : language === "ru"
                ? "должно быть сквозное повреждение деталей, растрескивание, отслоение и липкость покрывающей пленки материала верха и подкладки"
              : "there should be through damage to parts, cracking, delamination and stickiness of the covering film of the upper and lining material"}
          </li>
          <li>
            {language === "ua"
              ? "деталі взуття мають бути правильно розташовані, шви добре з'єднані"
              : language === "ru"
                ? "детали обуви должны быть правильно расположены, швы хорошо соединены"
              : "footwear parts must be properly positioned, seams well connected"}
          </li>
          <li>
            {language === "ua"
              ? "підошва якісно проклеєна"
              : language === "ru"
                ? "подошва качественно проклеена"
              : "sole is quality glued"}
          </li>
        </ul>
      </div>

      <div className="terms-section">
        <h2>{language === "ua" ? "Не є браком" : language === "ru" ? "Не является браком" : "Not Considered Defects"}</h2>
        <ul>
          <li>
            {language === "ua"
              ? "сліди клею в місці склеювання деталей взуття"
              : language === "ru"
                ? "следы клея в месте склеивания деталей обуви"
              : "traces of glue at the place of gluing footwear parts"}
          </li>
          <li>
            {language === "ua"
              ? "необроблені бічні краї язичка та внутрішньої частини у взутті є технологією виробництва"
              : language === "ru"
                ? "необработанные боковые края язычка и внутренней части в обуви являются технологией производства"
              : "unprocessed side edges of the tongue and inner part in footwear are part of the manufacturing technology"}
          </li>
          <li>
            {language === "ua"
              ? "незначні дефекти (крапка, нитка, крапелька клею, не ідеально рівний шов, які не видно, коли взуття знаходиться на нозі, і не вплинуть на носіння взуття)"
              : language === "ru"
                ? "незначительные дефекты (точка, нитка, капелька клея, не идеально ровный шов, которые не видны, когда обувь находится на ноге, и не повлияют на ношение обуви)"
              : "minor defects (dot, thread, drop of glue, not perfectly even seam, which are not visible when the footwear is on the foot, and will not affect the wearing of the footwear)"}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TermsConditions;
