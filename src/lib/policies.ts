import type { PolicyDocument } from "@/components/app/PolicyLayout"

export const shippingPolicy: PolicyDocument = {
  title: "Shipping policy",
  summary: "Revara currently ships within India. Every keyboard is made to order.",
  sections: [
    {
      title: "Where we ship",
      paragraphs: ["We currently deliver within India only. International shipping is not available."],
    },
    {
      title: "Build and delivery time",
      paragraphs: ["Please allow 10–14 days for the build, followed by an estimated 2–5 days for delivery. These are estimates, not guarantees."],
    },
    {
      title: "Shipping charge",
      paragraphs: ["A flat shipping charge of ₹150 applies to each order. The final amount and any applicable charges are shown before payment."],
    },
    {
      title: "Tracking and delivery",
      paragraphs: [
        "After dispatch, the courier name and tracking details will be added to the order page and sent with the shipping notification.",
        "Please check your delivery address and phone number before placing an order. If a parcel is delayed or arrives damaged, contact Support with your order details and photos.",
      ],
    },
  ],
}

export const returnsPolicy: PolicyDocument = {
  title: "Returns, cancellations and refunds",
  summary: "Custom-built keyboards are not eligible for returns or exchanges. Approved claims may qualify for a free replacement part or, in limited cases, a refund.",
  sections: [
    {
      title: "No returns or exchanges of builds",
      paragraphs: ["We do not accept returns or exchanges of a custom build for a change of mind, colour or layout preference, configurator choices, or customer-supplied parts."],
    },
    {
      title: "Replacement parts",
      paragraphs: ["If a part arrives faulty or damaged, or stops working, raise a claim through Support with your order ID, a description and genuine photos or video. If approved, the replacement part and its shipping are free."],
    },
    {
      title: "Refunds",
      paragraphs: ["A refund is considered only for an approved claim when the product is returned to Revara at the buyer's expense using the return address provided with the claim approval. A claim approval and return address are required before sending anything back."],
    },
    {
      title: "Order cancellation",
      paragraphs: ["An order may be cancelled before it moves to Building. Once building has started, the order cannot be cancelled. Contact Support with the order ID to request cancellation."],
    },
    {
      title: "Your rights",
      paragraphs: ["Nothing in this policy limits rights available under applicable consumer law."],
    },
  ],
}

export const warrantyPolicy: PolicyDocument = {
  title: "Warranty and claims",
  summary: "Warranty coverage applies only to products that are specifically marked as covered in the catalog and on the order.",
  sections: [
    {
      title: "Coverage period",
      paragraphs: ["A covered product has a 12-month warranty from its delivery date. Products without a warranty marking are not covered by this warranty. Check the product page and order details for the applicable status."],
    },
    {
      title: "What is covered",
      paragraphs: ["Manufacturing defects and failures under normal use may qualify for a claim. Each claim is reviewed based on the product, evidence and warranty status."],
    },
    {
      title: "What is not covered",
      bullets: [
        "Damage caused by drops, liquid, excessive force or improper assembly.",
        "Normal wear, including keycap shine, switch wear and gradual battery-capacity loss.",
        "Third-party parts supplied or installed by the customer, and damage caused by them.",
        "Cosmetic marks that do not affect function, or products outside their stated coverage period.",
      ],
    },
    {
      title: "How to raise a claim",
      paragraphs: ["Sign in, open Support → Raise a claim, select the order, describe the issue and include clear photos or video. Approved replacement parts, including shipping, are free. A refund is considered only under the Returns policy."],
    },
  ],
}

export const privacyPolicy: PolicyDocument = {
  title: "Privacy policy",
  summary: "Revara does not store card, UPI or bank details. This preview does not connect to a live payment service.",
  sections: [
    {
      title: "Information used by the store",
      bullets: [
        "Account details such as name and email, if account features are enabled.",
        "Order details such as delivery contact information, chosen configuration and order status.",
        "Saved designs and any reviews or claim evidence that you choose to submit.",
        "Basic device and browser information needed to operate and secure the service.",
      ],
    },
    {
      title: "Payments",
      paragraphs: ["Revara does not store your full card, UPI or bank details. If live payments are enabled, payment details are handled by the payment provider rather than stored by Revara."],
    },
    {
      title: "Local storage",
      paragraphs: ["This preview may store cart contents, saved designs and your theme preference in your browser's local storage. Clear site data in your browser to remove these local items."],
    },
    {
      title: "Your choices",
      paragraphs: ["You may request access, correction or deletion of personal information, subject to applicable law. Support contact details will be published before launch."],
    },
  ],
}

export const termsPolicy: PolicyDocument = {
  title: "Terms of use",
  summary: "These terms describe the intended use of the Revara store preview. Final terms are subject to completion and legal review before launch.",
  sections: [
    {
      title: "Orders and prices",
      paragraphs: ["Prices are shown in Indian rupees. An order is accepted only after an order confirmation. Revara may contact you if a price, availability or configuration error affects an order."],
    },
    {
      title: "Custom builds",
      paragraphs: ["You are responsible for the options selected in the configurator. The on-screen keyboard preview is illustrative and the finished product may vary slightly. Builds are made to order and are subject to the no-returns policy."],
    },
    {
      title: "Payments and discounts",
      paragraphs: ["Live payment processing is not connected in this preview. When enabled, payment methods and any discount conditions will be shown before purchase. Only one discount code may be used per order; eligibility must be verified by the store."],
    },
    {
      title: "Firmware and safe use",
      paragraphs: ["Firmware is based on ZMK and its applicable open-source licences. Follow the supplied battery and firmware safety guidance; do not use a damaged or swollen battery."],
    },
    {
      title: "Applicable law",
      paragraphs: ["Indian law applies, subject to rights available under applicable consumer law. Final legal entity, contact and jurisdiction details will be published before launch."],
    },
  ],
}
