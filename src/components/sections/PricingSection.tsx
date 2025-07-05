import React from 'react';
import { motion } from 'framer-motion';
import { Check, Plus, X } from 'lucide-react';

interface Plan {
  name: string;
  price: string;
  features: string[];
}

interface PricingSectionProps {
  content: {
    title: string;
    plans: Plan[];
  };
  isEditing: boolean;
  onChange: (content: any) => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({ content, isEditing, onChange }) => {
  const handleChange = (field: string, value: any) => {
    onChange({ ...content, [field]: value });
  };

  const handlePlanChange = (index: number, field: string, value: any) => {
    const updatedPlans = [...content.plans];
    updatedPlans[index] = { ...updatedPlans[index], [field]: value };
    handleChange('plans', updatedPlans);
  };

  const addPlan = () => {
    const newPlan: Plan = {
      name: 'New Plan',
      price: '$19',
      features: ['Feature 1', 'Feature 2', 'Feature 3']
    };
    handleChange('plans', [...content.plans, newPlan]);
  };

  const removePlan = (index: number) => {
    const updatedPlans = content.plans.filter((_, i) => i !== index);
    handleChange('plans', updatedPlans);
  };

  const addFeature = (planIndex: number) => {
    const updatedPlans = [...content.plans];
    updatedPlans[planIndex].features.push('New Feature');
    handleChange('plans', updatedPlans);
  };

  const removeFeature = (planIndex: number, featureIndex: number) => {
    const updatedPlans = [...content.plans];
    updatedPlans[planIndex].features = updatedPlans[planIndex].features.filter((_, i) => i !== featureIndex);
    handleChange('plans', updatedPlans);
  };

  const handleFeatureChange = (planIndex: number, featureIndex: number, value: string) => {
    const updatedPlans = [...content.plans];
    updatedPlans[planIndex].features[featureIndex] = value;
    handleChange('plans', updatedPlans);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {isEditing ? (
              <input
                type="text"
                value={content.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 bg-transparent border-2 border-dashed border-blue-300 rounded-lg p-2 text-center"
                placeholder="Enter section title"
              />
            ) : (
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {content.title}
              </h2>
            )}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 relative group border-2 ${
                index === 1 ? 'border-blue-500 scale-105' : 'border-gray-200'
              }`}
            >
              {index === 1 && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Popular
                </div>
              )}
              
              {isEditing && (
                <button
                  onClick={() => removePlan(index)}
                  className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              )}
              
              <div className="text-center mb-8">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={plan.name}
                      onChange={(e) => handlePlanChange(index, 'name', e.target.value)}
                      className="text-2xl font-bold text-gray-900 mb-4 bg-transparent border-2 border-dashed border-blue-300 rounded-lg p-2 w-full text-center"
                      placeholder="Plan name"
                    />
                    <input
                      type="text"
                      value={plan.price}
                      onChange={(e) => handlePlanChange(index, 'price', e.target.value)}
                      className="text-4xl font-bold text-blue-600 bg-transparent border-2 border-dashed border-blue-300 rounded-lg p-2 w-full text-center"
                      placeholder="$19"
                    />
                  </>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                    <div className="text-4xl font-bold text-blue-600 mb-2">{plan.price}</div>
                    <p className="text-gray-600">per month</p>
                  </>
                )}
              </div>
              
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    {isEditing ? (
                      <div className="flex-1 flex items-center gap-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => handleFeatureChange(index, featureIndex, e.target.value)}
                          className="flex-1 bg-transparent border-2 border-dashed border-blue-300 rounded-lg p-1 text-sm"
                          placeholder="Feature"
                        />
                        <button
                          onClick={() => removeFeature(index, featureIndex)}
                          className="w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                        >
                          <X className="w-2 h-2" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-700">{feature}</span>
                    )}
                  </div>
                ))}
                
                {isEditing && (
                  <button
                    onClick={() => addFeature(index)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Add Feature
                  </button>
                )}
              </div>
              
              <button
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  index === 1
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                Get Started
              </button>
            </motion.div>
          ))}
          
          {isEditing && (
            <motion.button
              onClick={addPlan}
              className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center">
                <Plus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <span className="text-gray-600">Add Plan</span>
              </div>
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;