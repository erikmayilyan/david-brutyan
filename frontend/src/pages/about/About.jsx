import React from 'react';
import { useLanguage } from '../../LanguageContext';
import './About.css';

const About = () => {
  const { language } = useLanguage('');

  const getLanguagePrefix = () => {
    return language === "ua" ? "/ua" : language === "ru" ? "/iv" : "/en";
  };

  return (
    <div className="about">
      <div className="about-image">
        <div className="about-text-overlay">
          <h2>{language === "ua" ? "ПРО НАС" : language === "ru" ? "О НАС" : "ABOUT US"}</h2>
        </div>
      </div>
      <div className="about-container">
        <p className="about-text">
          {language === "ua"
            ? "Mildoshoes — це український бренд жіночого взуття з історією понад 20 років. Ми поєднуємо досвід, стиль і якість, щоб створювати взуття, яке закохує з першого кроку. Маємо власне виробництво, а також співпрацюємо з найкращими українськими фабриками, що дозволяє нам контролювати кожен етап — від ідеї до готової пари. Унікальні дизайни, якісні матеріали та увага до деталей — усе це про Mildoshoes. За ці роки ми здобули тисячі задоволених клієнток, обирають нас з сезону в сезон. Ми цінуємо вашу довіру і постійно працюємо над тим, щоб кожна нова колекція була ще кращою."
            : language === "ru"
              ? "Mildoshoes — это украинский бренд женской обуви с историей более 20 лет. Мы сочетаем опыт, стиль и качество, чтобы создавать обувь, которая влюбляет с первого шага. Имеем собственное производство, а также сотрудничаем с лучшими украинскими фабриками, что позволяет нам контролировать каждый этап — от идеи до готовой пары. Уникальные дизайны, качественные материалы и внимание к деталям — всё это о Mildoshoes. За эти годы мы приобрели тысячи довольных клиенток, выбирающих нас из сезона в сезон. Мы ценим ваше доверие и постоянно работаем над тем, чтобы каждая новая коллекция была еще лучше."
              : "Mildoshoes is a Ukrainian women's footwear brand with over 20 years of history. We combine experience, style, and quality to create shoes that make you fall in love from the first step. We have our own production and also collaborate with the best Ukrainian factories, allowing us to control every stage — from idea to finished pair. Unique designs, quality materials, and attention to detail — that's what Mildoshoes is all about. Over the years, we have gained thousands of satisfied customers who choose us season after season. We value your trust and constantly work to make each new collection even better."}
        </p>
        <div className="about-button">
          <a href={`${getLanguagePrefix()}/shop`}>
            {language === "ua" ? "КУПИТИ ЗАРАЗ" : language === "ru" ? "КУПИТЬ СЕЙЧАС" : "SHOP NOW"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
