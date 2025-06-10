import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { LanguageProvider } from "../LanguageContext";
import Home from "../pages/home/Home";
import Search from "../pages/search/Search";
import ShopPage from "../pages/shop/ShopPage";
import SingleProduct from "../pages/shop/productDetails/singleProduct";
import Login from '../components/Login';
import Register from "../components/Register";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import UserDMain from "../pages/dashboard/user/dashboard/UserDMain";
import UserOrders from "../pages/dashboard/user/UserOrders";
import OrderDetails from "../pages/dashboard/user/OrderDetails";
import UserPayments from "../pages/dashboard/user/UserPayments";
import UserReviews from "../pages/dashboard/user/UserReviews";
import UserProfile from "../pages/dashboard/user/UserProfile";
import ForgotPassword from "../components/ForgotPassword";
import ResetPassword from "../components/ResetPassword";
import AdminDMain from "../pages/dashboard/admin/dashboard/AdminDMain";
import AddProduct from "../pages/dashboard/admin/addProduct/AddProduct";
import AddColorsUa from "../pages/dashboard/admin/addFilters/addColorsUa";
import AddColorsRu from "../pages/dashboard/admin/addFilters/addColorsRu";
import AddColorEn from "../pages/dashboard/admin/addFilters/addColorEn";
import AddCategoryUa from "../pages/dashboard/admin/addFilters/addCategoryUa";
import AddCategoryRu from "../pages/dashboard/admin/addFilters/addCategoryRu";
import AddCategoryEn from "../pages/dashboard/admin/addFilters/addCategoryEn";
import AddSeasonUa from "../pages/dashboard/admin/addFilters/addSeasonUa";
import AddSeasonRu from "../pages/dashboard/admin/addFilters/addSeasonRu";
import AddSeasonEn from "../pages/dashboard/admin/addFilters/addSeasonEn";
import ManageProduct from "../pages/dashboard/admin/manageProduct/ManageProduct";
import UpdateProduct from "../pages/dashboard/admin/manageProduct/UpdateProduct";
import ManageUser from "../pages/dashboard/admin/users/ManageUser";
import ManageOrders from "../pages/dashboard/admin/manageOrders/ManageOrders";
import AddBlogs from "../pages/dashboard/admin/blogs/addBlogs";
import About from "../pages/about/About";
import TermsConditions from "../pages/terms/TermsConditions";
import BlogDetails from "../pages/blogs/BlogDetails";
import Reviews from "../pages/reviews/Reviews";
import Opinion from "../pages/dashboard/admin/manageOpinion/Opinion";
import Archived from "../pages/dashboard/admin/archivedOpinion/Archived";
import AddFAQ from "../pages/dashboard/admin/faq/addFAQ";
import FAQ from "../faq/FAQ";
import PaymentPage from "../pages/shop/PaymentPage";
import Success from "../pages/success/Success";
import ManageBanner from "../pages/dashboard/admin/banner/ManageBanner";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LanguageProvider>
        <App />
      </LanguageProvider>
    ),
    children: [
      {
        path: "/ua",
        element: <Home />,
      },
      {
        path: "/ua/search",
        element: <Search />,
      },
      {
        path: "/ua/about",
        element: <About />
      },
      {
        path: "/ua/reviews",
        element: <Reviews />
      },
      {
        path: "/ua/termsconditions",
        element: <TermsConditions />
      },
      {
        path: "/ua/shop",
        element: <ShopPage />
      },
      {
        path: "/ua/shop/:id",
        element: <SingleProduct />
      },
      {
        path: "/ua/blogs/:id",
        element: <BlogDetails />
      },
      {
        path: "/ua/success",
        element: <LanguageProvider><Success /></LanguageProvider>
      },
      {
        path: '/ua/faq',
        element: <FAQ />
      },
      {
        path: "/ua/payment",
        element: <PaymentPage />
      },
      {
        path: "/iv",
        element: <Home />,
      },
      {
        path: "/iv/search",
        element: <Search />,
      },
      {
        path: "/iv/about",
        element: <About />,
      },
      {
        path: "/iv/reviews",
        element: <Reviews />
      },
      {
        path: "/iv/termsconditions",
        element: <TermsConditions />
      },
      {
        path: "/iv/shop",
        element: <ShopPage />
      },
      {
        path: "/iv/shop/:id",
        element: <SingleProduct />
      },
      {
        path: "/iv/blogs/:id",
        element: <BlogDetails />
      },
      {
        path: "/iv/success",
        element: <LanguageProvider><Success /></LanguageProvider>
      },
      {
        path: '/iv/faq',
        element: <FAQ />
      },
      {
        path: "/iv/payment",
        element: <PaymentPage />
      },
      {
        path: "/en",
        element: <Home />,
      },
      {
        path: "/en/search",
        element: <Search />,
      },
      {
        path: "/en/about",
        element: <About />
      },
      {
        path: "/en/reviews",
        element: <Reviews />
      },
      {
        path: "/en/termsconditions",
        element: <TermsConditions />
      },
      {
        path: "/en/shop",
        element: <ShopPage />
      },
      {
        path: "/en/shop/:id",
        element: <SingleProduct />
      },
      {
        path: "/en/blogs/:id",
        element: <BlogDetails />
      },
      {
        path: "/en/success",
        element: <LanguageProvider><Success /></LanguageProvider>
      },
      {
        path: '/en/faq',
        element: <FAQ />
      },
      {
        path: "/en/payment",
        element: <PaymentPage />
      },
    ],
  },
  {
    path: "/success",
    element: (
      <LanguageProvider>
        <App>
          <Success />
        </App>
      </LanguageProvider>
    )
  },
  {
    path: "/en/login",
    element: <LanguageProvider><Login /></LanguageProvider>
  },
  {
    path: "/en/forgot-password",
    element: <LanguageProvider><ForgotPassword /></LanguageProvider>
  },
  {
    path: '/en/reset-password/:id/:token',
    element: <LanguageProvider><ResetPassword /></LanguageProvider>
  },
  {
    path: '/en/register',
    element: <LanguageProvider><Register /></LanguageProvider>
  },
  {
    path: '/ua/login',
    element: <LanguageProvider><Login /></LanguageProvider>
  },
  {
    path: '/iv/login',
    element: <LanguageProvider><Login /></LanguageProvider>
  },
  {
    path: "/ua/forgot-password",
    element: <LanguageProvider><ForgotPassword /></LanguageProvider>
  },
  {
    path: "/iv/forgot-password",
    element: <LanguageProvider><ForgotPassword /></LanguageProvider>
  },
  {
    path: '/ua/reset-password/:id/:token',
    element: <LanguageProvider><ResetPassword /></LanguageProvider>
  },
  {
    path: '/ua/register',
    element: <LanguageProvider><Register /></LanguageProvider>
  },
  {
    path: '/iv/register',
    element: <LanguageProvider><Register /></LanguageProvider>
  },
  {
    path: '/ua/dashboard',
    element: <LanguageProvider><PrivateRoute><DashboardLayout /></PrivateRoute></LanguageProvider>,
    children: [
      {
        path: '',
        element: <UserDMain />
      },
      {
        path: 'orders',
        element: <UserOrders />
      },
      {
        path: 'payments',
        element: <UserPayments />
      },
      {
        path: 'profile',
        element: <UserProfile />
      },
      {
        path: 'reviews',
        element: <UserReviews />
      },
      {
        path: 'orders/:orderId',
        element: <OrderDetails />
      },
      {
        path: 'admin',
        element: <PrivateRoute role="admin"><AdminDMain /></PrivateRoute>
      },
      {
        path: 'add-new-product',
        element: <PrivateRoute role="admin"><AddProduct /></PrivateRoute>
      },
      {
        path: 'add-new-color-ua',
        element: <PrivateRoute role="admin"><AddColorsUa /></PrivateRoute>
      },
      {
        path: 'add-new-color-ru',
        element: <PrivateRoute role="admin"><AddColorsRu /></PrivateRoute>
      },
      {
        path: 'add-new-color-en',
        element: <PrivateRoute role="admin"><AddColorEn /></PrivateRoute>
      },
      {
        path: 'add-new-category-ua',
        element: <PrivateRoute role="admin"><AddCategoryUa /></PrivateRoute>
      },
      {
        path: 'add-new-category-ru',
        element: <PrivateRoute role="admin"><AddCategoryRu /></PrivateRoute>
      },
      {
        path: 'add-new-category-en',
        element: <PrivateRoute role="admin"><AddCategoryEn /></PrivateRoute>
      },
      {
        path: 'manage-products',
        element: <PrivateRoute role="admin"><ManageProduct /></PrivateRoute>
      },
      {
        path: 'update-product/:id',
        element: <PrivateRoute role="admin"><UpdateProduct /></PrivateRoute>
      },
      {
        path: 'users',
        element: <PrivateRoute role="admin"><ManageUser /></PrivateRoute>
      },
      {
        path: 'manage-orders',
        element: <PrivateRoute role="admin"><ManageOrders /></PrivateRoute>
      },
      {
        path: 'add-blog',
        element: <PrivateRoute role="admin"><AddBlogs /></PrivateRoute>
      },
      {
        path: 'manage-opinions',
        element: <PrivateRoute role="admin"><Opinion /></PrivateRoute>
      },
      {
        path: 'archived-opinions',
        element: <PrivateRoute role="admin"><Archived /></PrivateRoute>
      },
      {
        path: 'add-new-season-ua',
        element: <PrivateRoute role="admin"><AddSeasonUa /></PrivateRoute>
      },
      {
        path: 'add-new-season-ru',
        element: <PrivateRoute role="admin"><AddSeasonRu /></PrivateRoute>
      },
      {
        path: 'add-new-season-en',
        element: <PrivateRoute role="admin"><AddSeasonEn /></PrivateRoute>
      },
      {
        path: 'add-faq',
        element: <PrivateRoute role="admin"><AddFAQ /></PrivateRoute>
      },
      {
        path: 'banner',
        element: <PrivateRoute role="admin"><ManageBanner /></PrivateRoute>
      }
    ]
  },
  {
    path: '/iv/dashboard',
    element: <LanguageProvider><PrivateRoute><DashboardLayout /></PrivateRoute></LanguageProvider>,
    children: [
      {
        path: '',
        element: <UserDMain />
      },
      {
        path: 'orders',
        element: <UserOrders />
      },
      {
        path: 'payments',
        element: <UserPayments />
      },
      {
        path: 'profile',
        element: <UserProfile />
      },
      {
        path: 'reviews',
        element: <UserReviews />
      },
      {
        path: 'orders/:orderId',
        element: <OrderDetails />
      },
      {
        path: 'admin',
        element: <PrivateRoute role="admin"><AdminDMain /></PrivateRoute>
      },
      {
        path: 'add-new-product',
        element: <PrivateRoute role="admin"><AddProduct /></PrivateRoute>
      },
      {
        path: 'add-new-color-ua',
        element: <PrivateRoute role="admin"><AddColorsUa /></PrivateRoute>
      },
      {
        path: 'add-new-color-ru',
        element: <PrivateRoute role="admin"><AddColorsRu /></PrivateRoute>
      },
      {
        path: 'add-new-color-en',
        element: <PrivateRoute role="admin"><AddColorEn /></PrivateRoute>
      },
      {
        path: 'add-new-category-ua',
        element: <PrivateRoute role="admin"><AddCategoryUa /></PrivateRoute>
      },
      {
        path: 'add-new-category-ru',
        element: <PrivateRoute role="admin"><AddCategoryRu /></PrivateRoute>
      },
      {
        path: 'add-new-category-en',
        element: <PrivateRoute role="admin"><AddCategoryEn /></PrivateRoute>
      },
      {
        path: 'manage-products',
        element: <PrivateRoute role="admin"><ManageProduct /></PrivateRoute>
      },
      {
        path: 'update-product/:id',
        element: <PrivateRoute role="admin"><UpdateProduct /></PrivateRoute>
      },
      {
        path: 'users',
        element: <PrivateRoute role="admin"><ManageUser /></PrivateRoute>
      },
      {
        path: 'manage-orders',
        element: <PrivateRoute role="admin"><ManageOrders /></PrivateRoute>
      },
      {
        path: 'add-blog',
        element: <PrivateRoute role="admin"><AddBlogs /></PrivateRoute>
      },
      {
        path: 'manage-opinions',
        element: <PrivateRoute role="admin"><Opinion /></PrivateRoute>
      },
      {
        path: 'archived-opinions',
        element: <PrivateRoute role="admin"><Archived /></PrivateRoute>
      },
      {
        path: 'add-new-season-ua',
        element: <PrivateRoute role="admin"><AddSeasonUa /></PrivateRoute>
      },
      {
        path: 'add-new-season-ru',
        element: <PrivateRoute role="admin"><AddSeasonRu /></PrivateRoute>
      },
      {
        path: 'add-new-season-en',
        element: <PrivateRoute role="admin"><AddSeasonEn /></PrivateRoute>
      },
      {
        path: 'add-faq',
        element: <PrivateRoute role="admin"><AddFAQ /></PrivateRoute>
      },
      {
        path: 'banner',
        element: <PrivateRoute role="admin"><ManageBanner /></PrivateRoute>
      }
    ]
  },
  {
    path: '/en/dashboard',
    element: <LanguageProvider><PrivateRoute><DashboardLayout /></PrivateRoute></LanguageProvider>,
    children: [
      {
        path: '',
        element: <UserDMain />
      },
      {
        path: 'orders',
        element: <UserOrders />
      },
      {
        path: 'payments',
        element: <UserPayments />
      },
      {
        path: 'profile',
        element: <UserProfile />
      },
      {
        path: 'reviews',
        element: <UserReviews />
      },
      {
        path: 'orders/:orderId',
        element: <OrderDetails />
      },
      {
        path: 'admin',
        element: <PrivateRoute role="admin"><AdminDMain /></PrivateRoute>
      },
      {
        path: 'add-new-product',
        element: <PrivateRoute role="admin"><AddProduct /></PrivateRoute>
      },
      {
        path: 'add-new-color-ua',
        element: <PrivateRoute role="admin"><AddColorsUa /></PrivateRoute>
      },
      {
        path: 'add-new-color-ru',
        element: <PrivateRoute role="admin"><AddColorsRu /></PrivateRoute>
      },
      {
        path: 'add-new-color-en',
        element: <PrivateRoute role="admin"><AddColorEn /></PrivateRoute>
      },
      {
        path: 'add-new-category-ua',
        element: <PrivateRoute role="admin"><AddCategoryUa /></PrivateRoute>
      },
      {
        path: 'add-new-category-ru',
        element: <PrivateRoute role="admin"><AddCategoryRu /></PrivateRoute>
      },
      {
        path: 'add-new-category-en',
        element: <PrivateRoute role="admin"><AddCategoryEn /></PrivateRoute>
      },
      {
        path: 'manage-products',
        element: <PrivateRoute role="admin"><ManageProduct /></PrivateRoute>
      },
      {
        path: 'update-product/:id',
        element: <PrivateRoute role="admin"><UpdateProduct /></PrivateRoute>
      },
      {
        path: 'users',
        element: <PrivateRoute role="admin"><ManageUser /></PrivateRoute>
      },
      {
        path: 'manage-orders',
        element: <PrivateRoute role="admin"><ManageOrders /></PrivateRoute>
      },
      {
        path: 'add-blog',
        element: <PrivateRoute role="admin"><AddBlogs /></PrivateRoute>
      },
      {
        path: 'manage-opinions',
        element: <PrivateRoute role="admin"><Opinion /></PrivateRoute>
      },
      {
        path: 'archived-opinions',
        element: <PrivateRoute role="admin"><Archived /></PrivateRoute>
      },
      {
        path: 'add-new-season-ua',
        element: <PrivateRoute role="admin"><AddSeasonUa /></PrivateRoute>
      },
      {
        path: 'add-new-season-ru',
        element: <PrivateRoute role="admin"><AddSeasonRu /></PrivateRoute>
      },
      {
        path: 'add-new-season-en',
        element: <PrivateRoute role="admin"><AddSeasonEn /></PrivateRoute>
      },
      {
        path: 'add-faq',
        element: <PrivateRoute role="admin"><AddFAQ /></PrivateRoute>
      },
      {
        path: 'banner',
        element: <PrivateRoute role="admin"><ManageBanner /></PrivateRoute>
      }
    ]
  }
]);

export default router;
