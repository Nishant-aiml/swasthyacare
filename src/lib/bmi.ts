export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}

export function getBMIAdvice(bmi: number): string {
  if (bmi < 18.5) {
    return 'Consider consulting a healthcare provider about healthy ways to gain weight. Focus on nutrient-rich foods and strength training.';
  } else if (bmi < 25) {
    return 'You\'re at a healthy weight. Maintain your current lifestyle with regular exercise and balanced nutrition.';
  } else if (bmi < 30) {
    return 'Consider making lifestyle changes to reach a healthier weight. Focus on portion control and increasing physical activity.';
  } else {
    return 'Please consult a healthcare provider for personalized advice on weight management. Consider lifestyle changes and professional support.';
  }
}
