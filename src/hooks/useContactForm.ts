import { useTranslation } from 'react-i18next';

interface ContactFormLabels {
  label_name: string;
  placeholder_name: string;
  label_email: string;
  placeholder_email: string;
  label_project: string;
  placeholder_project: string;
  project_options: string[];
  label_message: string;
  placeholder_message: string;
  button_send: string;
  button_sending: string;
  social_title: string;
  contact_info_title: string;
  working_hours_title: string;
  success_message: string;
}

export const useContactForm = (): ContactFormLabels => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  return {
    label_name: isArabic ? 'الاسم الكامل' : t('Full Name'),
    placeholder_name: isArabic ? 'أحمد علي' : t('Ahmed Ali'),
    label_email: isArabic ? 'البريد الإلكتروني' : t('Email Address'),
    placeholder_email: isArabic ? 'ahmed@example.com' : t('ahmed@example.com'),
    label_project: isArabic ? 'نوع المشروع' : t('Project Type'),
    placeholder_project: isArabic ? 'اختر نوع المشروع' : t('Select project type'),
    project_options: isArabic
      ? ['نظام محاسبي', 'متجر إلكتروني', 'نظام إدارة', 'تطبيق موبايل', 'أخرى']
      : ['Accounting System', 'E-commerce Store', 'Management System', 'Mobile App', 'Other'],
    label_message: isArabic ? 'الرسالة' : t('Message'),
    placeholder_message: isArabic
      ? 'أخبرنا عن فكرتك وتوقعاتك...'
      : t('Tell us about your idea and expectations...'),
    button_send: isArabic ? 'إرسال الرسالة' : t('Send Message'),
    button_sending: isArabic ? 'جاري الإرسال...' : t('Sending...'),
    social_title: isArabic ? 'تابعنا على مواقع التواصل' : t('Follow us on social media'),
    contact_info_title: isArabic ? 'معلومات التواصل' : t('Contact Information'),
    working_hours_title: isArabic ? 'ساعات العمل' : t('Working Hours'),
    success_message: isArabic
      ? 'شكراً! تم إرسال رسالتك بنجاح'
      : t('Thank you! Your message has been sent successfully'),
  };
};