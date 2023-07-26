<script setup>
  const FAQ = [
    {
      question: 'Can I return products I bought?',
      answer:
        'Yes, we offer a hassle-free return policy. If you are not satisfied with your purchase, you can initiate a return within 15 days of receiving the product. Please make sure the item is in its original condition and packaging. Visit our Returns & Refunds page for more details on the process.',
    },
    {
      question: 'Is my personal information secure on this website?',
      answer:
        'Absolutely! We take data security seriously. Your personal information is protected using industry-standard encryption and security measures. We do not share your data with third parties without your consent. For more information, please review our Privacy Policy.',
    },
    {
      question: 'How can I track my order?',
      answer:
        "Tracking your order is easy. Once your order is shipped, we will provide you with a tracking number via email or SMS. You can enter this tracking number on our Order Tracking page to get real-time updates on your package's location and estimated delivery date.",
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept a variety of payment methods to offer you flexibility and convenience. You can pay for your order using credit/debit cards, PayPal, Google Pay, Apple Pay, and more. Rest assured, all payment transactions are secure.',
    },
    {
      question: 'Do you offer international shipping?',
      answer:
        'Yes, we ship our products internationally to many countries. During the checkout process, you can select your country from the list of available destinations. Keep in mind that international shipping may take longer, depending on your location.',
    },
    {
      question: 'How can I contact customer support?',
      answer:
        "We're here to help! You can reach our customer support team through various channels. For general inquiries, you can use the Contact Us form on our website. If you have specific order-related questions, you can use the order messaging system in your account. Alternatively, you can email us at customer@eshippr.com or call our helpline at +1 919 824 XX XX.",
    },
    {
      question: 'Do you offer discounts or promotions?',
      answer:
        'Yes, we frequently run special promotions and offer discounts on selected products. To stay updated on our latest deals, subscribe to our newsletter, and follow us on social media. Also, keep an eye on the homepage and product pages for any ongoing offers.',
    },
    {
      question: 'What is your shipping time for domestic orders?',
      answer:
        'For domestic orders, we strive to process and ship them within 1 business days. The actual delivery time may vary depending on your location and the shipping method chosen during checkout. You will receive a shipping confirmation email with an estimated delivery date once your order is dispatched.',
    },
  ];
</script>

<template>
  <div
    v-for="substance in FAQ"
    :key="substance"
    class="font-medium mb-4"
  >
    <p><b>Q:</b>{{ ` ${substance.question}` }}</p>
    <p><b>A:</b>{{ ` ${substance.answer}` }}</p>
  </div>
</template>
