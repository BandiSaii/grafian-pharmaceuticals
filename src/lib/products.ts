// Grafian Pharmaceuticals - Product Catalog
// All product information organized by therapeutic category

export interface Product {
  slug: string;
  brandName: string;
  genericName: string;
  composition: string;
  strength: string;
  indications: string;
  dosage: string;
  benefits: string;
  packaging: string;
  storage: string;
  category: ProductCategory;
  prescriptionRequired: boolean;
  // Optional local image asset for product packaging
  image?: string;
  imageAlt?: string;
  // Visual identity for the CSS-rendered product card
  cardColor: string; // primary accent color for the box design
  cardColor2: string; // secondary accent color
}

export type ProductCategory =
  | 'Cardiac Care'
  | 'Diabetic Care'
  | 'Anti Allergy'
  | 'PPI'
  | 'Antibiotic'
  | 'Multivitamin & Multiminerals'
  | 'General Care';

export const categoryOrder: ProductCategory[] = [
  'Cardiac Care',
  'Diabetic Care',
  'Anti Allergy',
  'PPI',
  'Antibiotic',
  'Multivitamin & Multiminerals',
  'General Care',
];

export const categoryDescriptions: Record<ProductCategory, string> = {
  'Cardiac Care':
    'Advanced cardiovascular therapies for hypertension, lipid management, and comprehensive cardiac protection — engineered for doctors treating high-risk patients.',
  'Diabetic Care':
    'Evidence-based anti-diabetic formulations combining modern oral hypoglycaemic agents to help physicians achieve optimal glycaemic control.',
  'Anti Allergy':
    'Fast-acting, non-sedating allergy relief combinations that address both upper-respiratory and inflammatory components of allergic disease.',
  PPI:
    'Proton-pump inhibitor therapy for GERD, peptic ulcers and acid-related disorders — formulated for sustained acid suppression.',
  Antibiotic:
    'Broad-spectrum antibacterial combinations built around beta-lactamase inhibition for resistant infections.',
  'Multivitamin & Multiminerals':
    'High-bioavailability nutritional supplements to bridge dietary gaps and support recovery in patients of every age group.',
  'General Care':
    'Daily wellness formulations including neuro-nutrient combinations and bone-support blends for long-term patient wellbeing.',
};

export const categoryIcons: Record<ProductCategory, string> = {
  'Cardiac Care': 'heart',
  'Diabetic Care': 'droplet',
  'Anti Allergy': 'wind',
  PPI: 'pill',
  Antibiotic: 'shield',
  'Multivitamin & Multiminerals': 'sparkles',
  'General Care': 'leaf',
};

const normalizeProductImageKey = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ');

const productImageFiles = [
  'TERYN 40 MG.jpeg',
  'TERYN H 40 MG.jpeg',
  'ROJUTRI 10 MG.jpeg',
  'ROJUTRI 20 MG.jpeg',
  'ROJUTRI F 10.jpeg',
  'ROJUTRI CV 10 MG.jpeg',
  'ROJUTRI CV 20 MG.jpeg',
  'ROJUTRI GOLD 10 MG.jpeg',
  'ROJUTRI GOLD 20 MG.jpeg',
  'GUNAA M1.jpeg',
  'GUNAA M2.jpeg',
  'MONEE LC.jpeg',
  'Panorun D.jpg',
];

const productImageLookup = new Map<string, string>(
  productImageFiles.map((fileName) => {
    const baseName = fileName.replace(/\.[^/.]+$/, '');
    return [normalizeProductImageKey(baseName), `/uploads/medicin/medicin pics/${fileName}`] as const;
  })
);

const getProductImageByName = (brandName: string) => productImageLookup.get(normalizeProductImageKey(brandName));

export const products: Product[] = [
  // ============ CARDIAC CARE ============
  {
    slug: 'teryn-40-mg',
    brandName: 'TERYN 40 MG',
    genericName: 'Telmisartan Tablets IP',
    composition: 'Telmisartan 40 mg',
    strength: '40 mg',
    indications:
      'Essential hypertension. Also indicated for cardiovascular risk reduction in patients unable to take ACE inhibitors.',
    dosage:
      'Adults: 40 mg once daily. Dose may be titrated to 80 mg once daily based on response. To be taken at the same time each day, with or without food.',
    benefits:
      'Sustained 24-hour blood pressure control, proven cardiovascular protection, favourable tolerability profile, and once-daily convenience that supports patient adherence.',
    packaging: 'Alu-Alu blister pack of 10 tablets; 10 such blisters per carton.',
    storage: 'Store below 25°C. Protect from moisture and light. Keep out of reach of children.',
    category: 'Cardiac Care',
    prescriptionRequired: true,
    cardColor: '#1e40af',
    cardColor2: '#3b82f6',
    image: getProductImageByName('TERYN 40 MG'),
    imageAlt: 'TERYN 40 MG packaging',
  },
  {
    slug: 'teryn-h-40-mg',
    brandName: 'TERYN H 40 MG',
    genericName: 'Telmisartan & Hydrochlorothiazide Tablets',
    composition: 'Telmisartan 40 mg + Hydrochlorothiazide 12.5 mg',
    strength: '40 mg / 12.5 mg',
    indications:
      'Treatment of essential hypertension not adequately controlled by telmisartan or hydrochlorothiazide alone.',
    dosage: 'One tablet once daily. Dose may be adjusted based on clinical response.',
    benefits:
      'Dual mechanism of action provides superior BP reduction compared with monotherapy, with a complementary effect that minimises dose-dependent side effects.',
    packaging: 'Alu-Alu blister pack of 10 tablets; 10 blisters per carton.',
    storage: 'Store below 25°C in a dry place. Protect from light. Keep out of reach of children.',
    category: 'Cardiac Care',
    prescriptionRequired: true,
    cardColor: '#1e40af',
    cardColor2: '#0ea5e9',
    image: getProductImageByName('TERYN H 40 MG'),
    imageAlt: 'TERYN H 40 MG packaging',
  },
  {
    slug: 'teryn-am-40-mg',
    brandName: 'TERYN AM 40 MG',
    genericName: 'Telmisartan & Amlodipine Tablets',
    composition: 'Telmisartan 40 mg + Amlodipine 5 mg',
    strength: '40 mg / 5 mg',
    indications:
      'Substitution therapy for patients whose blood pressure is adequately controlled on the separate components at the same strength.',
    dosage: 'One tablet once daily, preferably at the same time each day.',
    benefits:
      'Combines renin-angiotensin system blockade with calcium-channel inhibition, offering a powerful 24-hour BP-lowering effect with a low incidence of peripheral oedema.',
    packaging: 'Alu-Alu blister pack of 10 tablets; 10 blisters per carton.',
    storage: 'Store below 25°C. Protect from moisture and light. Keep out of reach of children.',
    category: 'Cardiac Care',
    prescriptionRequired: true,
    cardColor: '#1e3a8a',
    cardColor2: '#3b82f6',
  },
  {
    slug: 'teryn-ln',
    brandName: 'TERYN LN',
    genericName: 'Telmisartan & Cilnidipine Tablets',
    composition: 'Telmisartan 40 mg + Cilnidipine 10 mg',
    strength: '40 mg / 10 mg',
    indications: 'Essential hypertension requiring combination therapy for adequate BP control.',
    dosage: 'One tablet once daily, or as directed by the physician.',
    benefits:
      'Dual L/N-type calcium channel blockade of cilnidipine alongside ARB action suppresses sympathetic over-activity, providing steady BP control with renal protection.',
    packaging: 'Alu-Alu blister pack of 10 tablets; 10 blisters per carton.',
    storage: 'Store below 25°C. Protect from moisture and light. Keep out of reach of children.',
    category: 'Cardiac Care',
    prescriptionRequired: true,
    cardColor: '#0c4a6e',
    cardColor2: '#0284c7',
  },
  {
    slug: 'teryn-ch-12-5-mg',
    brandName: 'TERYN CH 12.5 MG',
    genericName: 'Telmisartan & Chlorthalidone Tablets',
    composition: 'Telmisartan 40 mg + Chlorthalidone 12.5 mg',
    strength: '40 mg / 12.5 mg',
    indications: 'Moderate to severe hypertension where combination diuretic therapy is required.',
    dosage: 'One tablet once daily in the morning.',
    benefits:
      'Chlorthalidone provides longer-lasting diuresis than HCTZ, resulting in superior 24-hour ambulatory BP control and proven cardiovascular event reduction.',
    packaging: 'Alu-Alu blister pack of 10 tablets; 10 blisters per carton.',
    storage: 'Store below 25°C in a dry place. Protect from light. Keep out of reach of children.',
    category: 'Cardiac Care',
    prescriptionRequired: true,
    cardColor: '#1e3a8a',
    cardColor2: '#2563eb',
  },
  {
    slug: 'teryn-beta-40-25-mg',
    brandName: 'TERYN BETA 40/25 MG',
    genericName: 'Telmisartan & Metoprolol Succinate Tablets',
    composition: 'Telmisartan 40 mg + Metoprolol Succinate 25 mg',
    strength: '40 mg / 25 mg',
    indications:
      'Hypertension with associated tachycardia, ischaemic heart disease, or where beta-blockade is clinically beneficial.',
    dosage: 'One tablet once daily, preferably in the morning.',
    benefits:
      'Combines ARB vasodilation with cardioselective beta-1 blockade, reducing heart rate, myocardial oxygen demand and afterload — ideal for hypertensive patients with coronary artery disease.',
    packaging: 'Alu-Alu blister pack of 10 tablets; 10 blisters per carton.',
    storage: 'Store below 25°C. Protect from moisture and light. Keep out of reach of children.',
    category: 'Cardiac Care',
    prescriptionRequired: true,
    cardColor: '#1e40af',
    cardColor2: '#60a5fa',
  },
  {
    slug: 'teryn-beta-40-50-mg',
    brandName: 'TERYN BETA 40/50 MG',
    genericName: 'Telmisartan & Metoprolol Succinate Tablets',
    composition: 'Telmisartan 40 mg + Metoprolol Succinate 50 mg',
    strength: '40 mg / 50 mg',
    indications:
      'Moderate to severe hypertension with elevated sympathetic drive; angina co-management.',
    dosage: 'One tablet once daily, titrated as per physician advice.',
    benefits:
      'Higher-strength beta-blockade combined with ARB delivers robust BP control and reduces the risk of arrhythmias and post-MI complications.',
    packaging: 'Alu-Alu blister pack of 10 tablets; 10 blisters per carton.',
    storage: 'Store below 25°C. Protect from moisture and light. Keep out of reach of children.',
    category: 'Cardiac Care',
    prescriptionRequired: true,
    cardColor: '#1e3a8a',
    cardColor2: '#3b82f6',
  },
  {
    slug: 'teryn-lnb-25-mg',
    brandName: 'TERYN LNB 25 MG',
    genericName: 'Telmisartan, Cilnidipine & Metoprolol Succinate Tablets',
    composition: 'Telmisartan 40 mg + Cilnidipine 10 mg + Metoprolol Succinate 25 mg',
    strength: '40 mg / 10 mg / 25 mg',
    indications: 'Resistant hypertension uncontrolled on dual therapy.',
    dosage: 'One tablet once daily, in the morning or as directed.',
    benefits:
      'Triple combination targets RAAS, L/N-type calcium channels and beta-receptors simultaneously — delivering comprehensive BP control in a single daily dose for complex hypertensive patients.',
    packaging: 'Alu-Alu blister pack of 10 tablets; 10 blisters per carton.',
    storage: 'Store below 25°C. Protect from moisture and light. Keep out of reach of children.',
    category: 'Cardiac Care',
    prescriptionRequired: true,
    cardColor: '#0c4a6e',
    cardColor2: '#0284c7',
  },
  {
    slug: 'teryn-lnb-50-mg',
    brandName: 'TERYN LNB 50 MG',
    genericName: 'Telmisartan, Cilnidipine & Metoprolol Succinate Tablets',
    composition: 'Telmisartan 40 mg + Cilnidipine 10 mg + Metoprolol Succinate 50 mg',
    strength: '40 mg / 10 mg / 50 mg',
    indications: 'Resistant hypertension with significant tachycardia or ischaemic burden.',
    dosage: 'One tablet once daily, or as directed by the cardiologist.',
    benefits:
      'Higher-strength metoprolol variant of the triple-drug combination — suitable for hypertensive patients with coexisting angina, post-MI recovery, or sympathetic overactivity.',
    packaging: 'Alu-Alu blister pack of 10 tablets; 10 blisters per carton.',
    storage: 'Store below 25°C. Protect from moisture and light. Keep out of reach of children.',
    category: 'Cardiac Care',
    prescriptionRequired: true,
    cardColor: '#1e3a8a',
    cardColor2: '#1d4ed8',
  },
  {
    slug: 'rojutri-10-mg',
    brandName: 'ROJUTRI 10 MG',
    genericName: 'Rosuvastatin Tablets IP',
    composition: 'Rosuvastatin 10 mg',
    strength: '10 mg',
    indications:
      'Hypercholesterolaemia, mixed dyslipidaemia, and hypertriglyceridaemia. Adjunct to diet in cardiovascular risk reduction.',
    dosage: 'Adults: 10 mg once daily, preferably in the evening. May be titrated to 20 mg.',
    benefits:
      'High-potency statin with proven LDL-C reduction of up to 52% at standard doses, favourable pharmacokinetic profile and minimal drug interactions.',
    packaging: 'Alu-Alu blister pack of 10 tablets; 10 blisters per carton.',
    storage: 'Store below 25°C. Protect from moisture and light. Keep out of reach of children.',
    category: 'Cardiac Care',
    prescriptionRequired: true,
    cardColor: '#1d4ed8',
    cardColor2: '#60a5fa',
    image: getProductImageByName('ROJUTRI 10 MG'),
    imageAlt: 'ROJUTRI 10 MG packaging',
  },
  {
    slug: 'rojutri-20-mg',
    brandName: 'ROJUTRI 20 MG',
    genericName: 'Rosuvastatin Modified-Release Tablets',
    composition: 'Rosuvastatin 20 mg (Modified Release)',
    strength: '20 mg',
    indications: 'Severe hypercholesterolaemia and patients requiring aggressive LDL-C lowering.',
    dosage: 'One tablet once daily in the evening.',
    benefits:
      'Modified-release formulation ensures a smooth lipid-lowering effect over 24 hours with reduced peak-related side effects and improved patient tolerability.',
    packaging: 'Alu-Alu blister pack of 10 tablets; 10 blisters per carton.',
    storage: 'Store below 25°C. Protect from moisture and light. Keep out of reach of children.',
    category: 'Cardiac Care',
    prescriptionRequired: true,
    cardColor: '#1e3a8a',
    cardColor2: '#3b82f6',
    image: getProductImageByName('ROJUTRI 20 MG'),
    imageAlt: 'ROJUTRI 20 MG packaging',
  },
  {
    slug: 'rojutri-f-10',
    brandName: 'ROJUTRI F 10',
    genericName: 'Rosuvastatin & Fenofibrate Tablets',
    composition: 'Rosuvastatin 10 mg + Fenofibrate 160 mg',
    strength: '10 mg / 160 mg',
    indications: 'Mixed dyslipidaemia with elevated LDL-C and triglycerides.',
    dosage: 'One tablet once daily, preferably with a meal.',
    benefits:
      'Combines LDL-C reduction from rosuvastatin with triglyceride-lowering and HDL-raising effects of fenofibrate — addressing the full atherogenic lipid profile.',
    packaging: 'Alu-Alu blister pack of 10 tablets; 10 blisters per carton.',
    storage: 'Store below 25°C in a dry place. Protect from light. Keep out of reach of children.',
    category: 'Cardiac Care',
    prescriptionRequired: true,
    cardColor: '#1d4ed8',
    cardColor2: '#0ea5e9',
    image: getProductImageByName('ROJUTRI F 10'),
    imageAlt: 'ROJUTRI F 10 packaging',
  },
  {
    slug: 'rojutri-cv-10-mg',
    brandName: 'ROJUTRI CV 10 MG',
    genericName: 'Rosuvastatin & Clopidogrel Tablets',
    composition: 'Rosuvastatin 10 mg + Clopidogrel 75 mg',
    strength: '10 mg / 75 mg',
    indications:
      'Secondary prevention in patients with atherosclerotic disease, post-PCI, or following an ischaemic event.',
    dosage: 'One tablet once daily, ideally in the evening.',
    benefits:
      'Combines lipid-lowering with antiplatelet protection in a single convenient dose — supporting long-term adherence in post-event cardiac patients.',
    packaging: 'Alu-Alu blister pack of 10 tablets; 10 blisters per carton.',
    storage: 'Store below 25°C. Protect from moisture and light. Keep out of reach of children.',
    category: 'Cardiac Care',
    prescriptionRequired: true,
    cardColor: '#1e3a8a',
    cardColor2: '#3b82f6',
    image: getProductImageByName('ROJUTRI CV 10 MG'),
    imageAlt: 'ROJUTRI CV 10 MG packaging',
  },
  {
    slug: 'rojutri-cv-20-mg',
    brandName: 'ROJUTRI CV 20 MG',
    genericName: 'Rosuvastatin & Clopidogrel Tablets',
    composition: 'Rosuvastatin 20 mg + Clopidogrel 75 mg',
    strength: '20 mg / 75 mg',
    indications: 'High-risk cardiovascular patients requiring aggressive lipid lowering and antiplatelet therapy.',
    dosage: 'One tablet once daily, preferably in the evening.',
    benefits:
      'High-intensity statin combined with antiplatelet therapy for maximum secondary prevention in patients with recent ACS or stent placement.',
    packaging: 'Alu-Alu blister pack of 10 tablets; 10 blisters per carton.',
    storage: 'Store below 25°C. Protect from moisture and light. Keep out of reach of children.',
    category: 'Cardiac Care',
    prescriptionRequired: true,
    cardColor: '#1e40af',
    cardColor2: '#2563eb',
    image: getProductImageByName('ROJUTRI CV 20 MG'),
    imageAlt: 'ROJUTRI CV 20 MG packaging',
  },
  {
    slug: 'rojutri-gold-10-mg',
    brandName: 'ROJUTRI GOLD 10 MG',
    genericName: 'Rosuvastatin, Clopidogrel & Aspirin Tablets',
    composition: 'Rosuvastatin 10 mg + Clopidogrel 75 mg + Aspirin 75 mg',
    strength: '10 mg / 75 mg / 75 mg',
    indications: 'Triple therapy for post-ACS patients and those with recent coronary stenting.',
    dosage: 'One tablet once daily after food, in the evening.',
    benefits:
      'Cardioprotective triple combination covering lipid lowering, dual antiplatelet therapy — proven to reduce MACE in secondary prevention.',
    packaging: 'Alu-Alu blister pack of 10 tablets; 10 blisters per carton.',
    storage: 'Store below 25°C. Protect from moisture and light. Keep out of reach of children.',
    category: 'Cardiac Care',
    prescriptionRequired: true,
    cardColor: '#1e3a8a',
    cardColor2: '#3b82f6',
    image: getProductImageByName('ROJUTRI GOLD 10 MG'),
    imageAlt: 'ROJUTRI GOLD 10 MG packaging',
  },
  {
    slug: 'rojutri-gold-20-mg',
    brandName: 'ROJUTRI GOLD 20 MG',
    genericName: 'Rosuvastatin, Clopidogrel & Aspirin Tablets',
    composition: 'Rosuvastatin 20 mg + Clopidogrel 75 mg + Aspirin 75 mg',
    strength: '20 mg / 75 mg / 75 mg',
    indications: 'High-risk post-ACS patients requiring intensive statin and dual antiplatelet therapy.',
    dosage: 'One tablet once daily after food, in the evening.',
    benefits:
      'High-intensity rosuvastatin (20 mg) variant of the triple cardioprotective formulation for aggressive secondary prevention.',
    packaging: 'Alu-Alu blister pack of 10 tablets; 10 blisters per carton.',
    storage: 'Store below 25°C. Protect from moisture and light. Keep out of reach of children.',
    category: 'Cardiac Care',
    prescriptionRequired: true,
    cardColor: '#1e40af',
    cardColor2: '#1d4ed8',
    image: getProductImageByName('ROJUTRI GOLD 20 MG'),
    imageAlt: 'ROJUTRI GOLD 20 MG packaging',
  },

  // ============ DIABETIC CARE ============
  {
    slug: 'gunaa-m1',
    brandName: 'GUNAA M1',
    genericName: 'Glimepiride & Metformin Hydrochloride Tablets',
    composition: 'Glimepiride 1 mg + Metformin Hydrochloride 500 mg',
    strength: '1 mg / 500 mg',
    indications: 'Type 2 diabetes mellitus not adequately controlled by diet, exercise, or monotherapy.',
    dosage: 'One tablet once daily with breakfast. Titrate based on glycaemic response.',
    benefits:
      'Combines insulin secretagogue (glimepiride) with insulin sensitizer (metformin) for comprehensive glycaemic control — particularly suitable for newly diagnosed T2DM patients.',
    packaging: 'Alu-Alu blister pack of 10 tablets; 10 blisters per carton.',
    storage: 'Store below 25°C. Protect from moisture and light. Keep out of reach of children.',
    category: 'Diabetic Care',
    prescriptionRequired: true,
    cardColor: '#0e7490',
    cardColor2: '#22d3ee',
    image: getProductImageByName('GUNAA M1'),
    imageAlt: 'GUNAA M1 packaging',
  },
  {
    slug: 'gunaa-m2',
    brandName: 'GUNAA M2',
    genericName: 'Glimepiride & Metformin Hydrochloride Tablets',
    composition: 'Glimepiride 2 mg + Metformin Hydrochloride 500 mg',
    strength: '2 mg / 500 mg',
    indications: 'Type 2 diabetes mellitus requiring intensified glycaemic control.',
    dosage: 'One tablet once daily with breakfast, or as directed.',
    benefits:
      'Higher-strength glimepiride combination for patients needing additional secretagogue support to reach HbA1c targets.',
    packaging: 'Alu-Alu blister pack of 10 tablets; 10 blisters per carton.',
    storage: 'Store below 25°C. Protect from moisture and light. Keep out of reach of children.',
    category: 'Diabetic Care',
    prescriptionRequired: true,
    cardColor: '#155e75',
    cardColor2: '#06b6d4',
    image: getProductImageByName('GUNAA M2'),
    imageAlt: 'GUNAA M2 packaging',
  },
  {
    slug: 'gunaa-mv1',
    brandName: 'GUNAA MV1',
    genericName: 'Glimepiride, Metformin & Voglibose Tablets',
    composition: 'Glimepiride 1 mg + Metformin 500 mg + Voglibose 0.2 mg',
    strength: '1 mg / 500 mg / 0.2 mg',
    indications: 'Type 2 diabetes with significant post-prandial hyperglycaemia.',
    dosage: 'One tablet thrice daily, immediately before meals.',
    benefits:
      'Triple combination addresses fasting glucose (metformin + glimepiride) and post-prandial spikes (voglibose) — comprehensive glycaemic control in a single formulation.',
    packaging: 'Alu-Alu blister pack of 10 tablets; 10 blisters per carton.',
    storage: 'Store below 25°C. Protect from moisture and light. Keep out of reach of children.',
    category: 'Diabetic Care',
    prescriptionRequired: true,
    cardColor: '#0e7490',
    cardColor2: '#0891b2',
  },
  {
    slug: 'gunaa-mv2',
    brandName: 'GUNAA MV2',
    genericName: 'Glimepiride, Metformin & Voglibose Tablets',
    composition: 'Glimepiride 2 mg + Metformin 500 mg + Voglibose 0.2 mg',
    strength: '2 mg / 500 mg / 0.2 mg',
    indications: 'Advanced Type 2 diabetes with poor post-prandial control on dual therapy.',
    dosage: 'One tablet thrice daily, immediately before meals.',
    benefits:
      'Higher-strength glimepiride triple therapy for patients whose HbA1c remains above target despite dual-oral therapy.',
    packaging: 'Alu-Alu blister pack of 10 tablets; 10 blisters per carton.',
    storage: 'Store below 25°C. Protect from moisture and light. Keep out of reach of children.',
    category: 'Diabetic Care',
    prescriptionRequired: true,
    cardColor: '#155e75',
    cardColor2: '#0e7490',
  },
  {
    slug: 'sipin-50-mg',
    brandName: 'SIPIN 50 MG',
    genericName: 'Sitagliptin Tablets',
    composition: 'Sitagliptin Phosphate 50 mg',
    strength: '50 mg',
    indications: 'Type 2 diabetes mellitus as monotherapy or as add-on to metformin.',
    dosage: 'One tablet twice daily, with or without food.',
    benefits:
      'DPP-4 inhibitor that enhances incretin activity, providing glucose-dependent insulin secretion with a low risk of hypoglycaemia and weight-neutral profile.',
    packaging: 'Alu-Alu blister pack of 10 tablets; 10 blisters per carton.',
    storage: 'Store below 25°C. Protect from moisture and light. Keep out of reach of children.',
    category: 'Diabetic Care',
    prescriptionRequired: true,
    cardColor: '#0e7490',
    cardColor2: '#22d3ee',
  },
  {
    slug: 'sipin-100-mg',
    brandName: 'SIPIN 100 MG',
    genericName: 'Sitagliptin Tablets',
    composition: 'Sitagliptin Phosphate 100 mg',
    strength: '100 mg',
    indications: 'Type 2 diabetes mellitus as monotherapy or as add-on therapy.',
    dosage: 'One tablet once daily, with or without food.',
    benefits:
      'Standard-strength DPP-4 inhibitor offering 24-hour glycaemic control with once-daily dosing and excellent tolerability.',
    packaging: 'Alu-Alu blister pack of 10 tablets; 10 blisters per carton.',
    storage: 'Store below 25°C. Protect from moisture and light. Keep out of reach of children.',
    category: 'Diabetic Care',
    prescriptionRequired: true,
    cardColor: '#155e75',
    cardColor2: '#06b6d4',
  },
  {
    slug: 'sipin-m-50-mg',
    brandName: 'SIPIN M 50 MG',
    genericName: 'Sitagliptin & Metformin Hydrochloride Tablets',
    composition: 'Sitagliptin 50 mg + Metformin 500 mg',
    strength: '50 mg / 500 mg',
    indications: 'Type 2 diabetes mellitus not adequately controlled on metformin or sitagliptin alone.',
    dosage: 'One tablet twice daily with meals.',
    benefits:
      'Combines DPP-4 inhibition with metformin insulin sensitization — complementary mechanisms that improve both fasting and post-prandial glucose.',
    packaging: 'Alu-Alu blister pack of 10 tablets; 10 blisters per carton.',
    storage: 'Store below 25°C. Protect from moisture and light. Keep out of reach of children.',
    category: 'Diabetic Care',
    prescriptionRequired: true,
    cardColor: '#0e7490',
    cardColor2: '#0891b2',
  },
  {
    slug: 'sipin-m-100-mg',
    brandName: 'SIPIN M 100 MG',
    genericName: 'Sitagliptin & Metformin Hydrochloride Tablets',
    composition: 'Sitagliptin 100 mg + Metformin 1000 mg',
    strength: '100 mg / 1000 mg',
    indications: 'Type 2 diabetes mellitus requiring intensification of therapy.',
    dosage: 'One tablet twice daily with meals.',
    benefits:
      'High-strength combination for patients needing maximum oral therapy before insulin initiation — supports HbA1c reduction of 1.5–2.0%.',
    packaging: 'Alu-Alu blister pack of 10 tablets; 10 blisters per carton.',
    storage: 'Store below 25°C. Protect from moisture and light. Keep out of reach of children.',
    category: 'Diabetic Care',
    prescriptionRequired: true,
    cardColor: '#155e75',
    cardColor2: '#0e7490',
  },

  // ============ ANTI ALLERGY ============
  {
    slug: 'monee-lc',
    brandName: 'MONEE LC',
    genericName: 'Montelukast & Levocetirizine Tablets',
    composition: 'Montelukast 10 mg + Levocetirizine 5 mg',
    strength: '10 mg / 5 mg',
    indications:
      'Allergic rhinitis, chronic urticaria, and mild to moderate asthma management.',
    dosage: 'One tablet once daily, preferably at bedtime.',
    benefits:
      'Dual-action allergy therapy combining leukotriene receptor antagonism (montelukast) with H1-antihistamine activity (levocetirizine) — comprehensive relief from sneezing, rhinorrhoea, itching, and nasal congestion.',
    packaging: 'Alu-Alu blister pack of 10 tablets; 10 blisters per carton.',
    storage: 'Store below 25°C. Protect from moisture and light. Keep out of reach of children.',
    category: 'Anti Allergy',
    prescriptionRequired: true,
    cardColor: '#0d9488',
    cardColor2: '#2dd4bf',
  },

  // ============ PPI ============
  {
    slug: 'panorun-d',
    brandName: 'PANORUN D',
    genericName: 'Pantoprazole & Domperidone Capsules',
    composition: 'Pantoprazole 40 mg + Domperidone 30 mg (Sustained Release)',
    strength: '40 mg / 30 mg',
    indications: 'GERD, acid peptic disease, and functional dyspepsia with associated nausea.',
    dosage: 'One capsule once daily, 30 minutes before breakfast.',
    benefits:
      'Combines proton-pump inhibition with prokinetic action — provides rapid symptom relief from acid reflux while addressing nausea and delayed gastric emptying.',
    packaging: 'Alu-Alu blister pack of 10 capsules; 10 blisters per carton.',
    storage: 'Store below 25°C. Protect from moisture and light. Keep out of reach of children.',
    category: 'PPI',
    prescriptionRequired: true,
    cardColor: '#b45309',
    cardColor2: '#f59e0b',
    image: getProductImageByName('PANORUN D'),
    imageAlt: 'PANORUN D packaging',
  },

  // ============ ANTIBIOTIC ============
  {
    slug: 'monalin-325-mg',
    brandName: 'MONALIN 325 MG',
    genericName: 'Amoxicillin & Potassium Clavulanate Tablets',
    composition: 'Amoxicillin 250 mg + Potassium Clavulanate 125 mg',
    strength: '250 mg / 125 mg',
    indications:
      'Broad-spectrum bacterial infections including respiratory, urinary, skin and soft tissue infections caused by beta-lactamase-producing organisms.',
    dosage: 'One tablet every 8 hours for 5–10 days, depending on infection severity.',
    benefits:
      'Beta-lactamase protected amoxicillin extends antibacterial coverage to resistant strains, providing reliable empirical therapy for common community-acquired infections.',
    packaging: 'Alu-Alu blister pack of 10 tablets; 10 blisters per carton.',
    storage: 'Store below 25°C. Protect from moisture and light. Keep out of reach of children.',
    category: 'Antibiotic',
    prescriptionRequired: true,
    cardColor: '#b91c1c',
    cardColor2: '#ef4444',
  },
  {
    slug: 'monalin-625-mg',
    brandName: 'MONALIN 625 MG',
    genericName: 'Amoxicillin & Potassium Clavulanate Tablets',
    composition: 'Amoxicillin 500 mg + Potassium Clavulanate 125 mg',
    strength: '500 mg / 125 mg',
    indications:
      'Moderate to severe bacterial infections — respiratory tract, urinary tract, ENT, skin, dental, and post-surgical prophylaxis.',
    dosage: 'One tablet every 12 hours for 5–10 days, as per physician advice.',
    benefits:
      'Higher amoxicillin strength delivers enhanced bactericidal activity against resistant strains — suitable for moderate infections and outpatient management.',
    packaging: 'Alu-Alu blister pack of 10 tablets; 10 blisters per carton.',
    storage: 'Store below 25°C. Protect from moisture and light. Keep out of reach of children.',
    category: 'Antibiotic',
    prescriptionRequired: true,
    cardColor: '#991b1b',
    cardColor2: '#dc2626',
  },

  // ============ MULTIVITAMIN & MULTIMINERALS ============
  {
    slug: 'strobic-plus',
    brandName: 'STROBIC PLUS',
    genericName: 'Multivitamin, Multiminerals & Antioxidant Tablets',
    composition:
      'Methylcobalamin 1500 mcg + Alpha Lipoic Acid 100 mg + Folic Acid 1.5 mg + Vitamin B6 3 mg + Inositol 100 mg + Chromium Picolinate 200 mcg + Zinc Sulphate 25 mg + Selenomethionine 100 mcg',
    strength: 'Comprehensive Nutraceutical',
    indications: 'Diabetic neuropathy, general weakness, nutritional deficiency, and as an antioxidant supplement.',
    dosage: 'One tablet daily after food, or as directed by the physician.',
    benefits:
      'Comprehensive neuro-nutrient formula combining B-vitamins, alpha lipoic acid and trace minerals to support nerve health, energy metabolism and antioxidant defence — particularly useful in diabetic patients.',
    packaging: 'Alu-Alu blister pack of 10 tablets; 10 blisters per carton.',
    storage: 'Store below 25°C. Protect from moisture and light. Keep out of reach of children.',
    category: 'Multivitamin & Multiminerals',
    prescriptionRequired: false,
    cardColor: '#15803d',
    cardColor2: '#22c55e',
  },
  {
    slug: 'strobic-4g',
    brandName: 'STROBIC 4G',
    genericName: 'Ginseng, Ginkgo Biloba, Garlic & Ginger Extract Tablets',
    composition:
      'Ginseng Extract 50 mg + Ginkgo Biloba 60 mg + Garlic Extract 100 mg + Ginger Extract 50 mg + Green Tea Extract 25 mg + Multivitamins & Minerals',
    strength: '4G Vitality Formula',
    indications: 'General fatigue, stress, cognitive support and cardiovascular wellness.',
    dosage: 'One tablet daily after breakfast.',
    benefits:
      'The 4G vitality blend supports stamina, cognitive function, circulation and immunity — a holistic daily wellness supplement for active adults.',
    packaging: 'Alu-Alu blister pack of 10 tablets; 10 blisters per carton.',
    storage: 'Store below 25°C. Protect from moisture and light. Keep out of reach of children.',
    category: 'Multivitamin & Multiminerals',
    prescriptionRequired: false,
    cardColor: '#166534',
    cardColor2: '#16a34a',
  },
  {
    slug: 'strobic-d3',
    brandName: 'STROBIC D3',
    genericName: 'Vitamin D3 (Cholecalciferol) Tablets',
    composition: 'Cholecalciferol 60,000 IU',
    strength: '60,000 IU',
    indications: 'Vitamin D deficiency, osteoporosis support, and maintenance of bone health.',
    dosage: 'One tablet once weekly for 8 weeks, then monthly as maintenance, or as directed.',
    benefits:
      'High-strength Vitamin D3 supports calcium absorption, bone mineralisation, immune function and muscle strength — addressing widespread deficiency in Indian populations.',
    packaging: 'Alu-Alu blister pack of 4 tablets; 10 blisters per carton.',
    storage: 'Store below 25°C. Protect from moisture and light. Keep out of reach of children.',
    category: 'Multivitamin & Multiminerals',
    prescriptionRequired: false,
    cardColor: '#a16207',
    cardColor2: '#eab308',
  },

  // ============ GENERAL CARE ============
  {
    slug: 'vitronurv-mnt',
    brandName: 'VITRONURV MNT',
    genericName: 'Mecobalamin, Niacinamide, Taurine Tablets',
    composition:
      'Mecobalamin 1500 mcg + Niacinamide 50 mg + Taurine 50 mg + Vitamin B1 10 mg + Vitamin B6 3 mg + Folic Acid 1.5 mg',
    strength: 'Neuro-Nutrient Complex',
    indications: 'Peripheral neuropathy, diabetic neuropathy, and B-vitamin deficiency states.',
    dosage: 'One tablet daily after food, or as directed.',
    benefits:
      'Targeted neurotrophic formulation supporting nerve regeneration and conduction — beneficial in patients with tingling, numbness, or burning sensations.',
    packaging: 'Alu-Alu blister pack of 10 tablets; 10 blisters per carton.',
    storage: 'Store below 25°C. Protect from moisture and light. Keep out of reach of children.',
    category: 'General Care',
    prescriptionRequired: false,
    cardColor: '#15803d',
    cardColor2: '#84cc16',
  },
  {
    slug: 'vitronurv-nt',
    brandName: 'VITRONURV NT',
    genericName: 'Neurotropic Nutrient Tablets',
    composition:
      'Methylcobalamin 1500 mcg + Alpha Lipoic Acid 200 mg + Vitamin B6 3 mg + Folic Acid 1.5 mg + Vitamin D3 1000 IU',
    strength: 'Advanced Nerve Care',
    indications: 'Diabetic neuropathy, alcoholic neuropathy, and chronic nerve pain.',
    dosage: 'One tablet daily after food.',
    benefits:
      'Advanced nerve care formula combining methylcobalamin with alpha lipoic acid and antioxidant nutrients — clinically studied for neuropathic symptom relief.',
    packaging: 'Alu-Alu blister pack of 10 tablets; 10 blisters per carton.',
    storage: 'Store below 25°C. Protect from moisture and light. Keep out of reach of children.',
    category: 'General Care',
    prescriptionRequired: false,
    cardColor: '#166534',
    cardColor2: '#22c55e',
  },
  {
    slug: 'vitronurn-cd-3',
    brandName: 'VITRONURN CD 3',
    genericName: 'Calcium, Vitamin D3 & Bone Support Tablets',
    composition:
      'Calcium Carbonate 500 mg + Vitamin D3 250 IU + Magnesium 50 mg + Zinc 5 mg + Boron 1 mg + Manganese 1 mg',
    strength: 'Bone Health Formula',
    indications: 'Osteoporosis, osteopenia, post-menopausal bone loss, and calcium deficiency.',
    dosage: 'One tablet twice daily after meals.',
    benefits:
      'Complete bone support formula with calcium, vitamin D3 and cofactor minerals — clinically balanced for optimal bone mineral density maintenance.',
    packaging: 'Alu-Alu blister pack of 10 tablets; 10 blisters per carton.',
    storage: 'Store below 25°C. Protect from moisture and light. Keep out of reach of children.',
    category: 'General Care',
    prescriptionRequired: false,
    cardColor: '#0f766e',
    cardColor2: '#14b8a6',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.brandName.toLowerCase().includes(q) ||
      p.genericName.toLowerCase().includes(q) ||
      p.composition.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.indications.toLowerCase().includes(q)
  );
}
