import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, User } from 'lucide-react';
import Button from '../ui/Button';
import { useUser } from '../../context/UserContext';

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useUser();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    nickname: '',
    birthYear: 2000,
    birthMonth: 1,
    birthDay: 1,
    gender: 'other',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNextStep = () => {
    setStep(2);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await register({
        nickname: formData.nickname,
        birthYear: parseInt(formData.birthYear.toString()),
        birthMonth: parseInt(formData.birthMonth.toString()),
        birthDay: parseInt(formData.birthDay.toString()),
        gender: formData.gender as 'male' | 'female' | 'other',
        area: 'Tokyo',
      });
      
      navigate('/home');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };
  
  // Generate year options (18 years and older)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - 18 - i);
  
  // Generate month options
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  
  // Generate day options
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {step === 1 ? 'アカウント登録' : 'プロフィール設定'}
          </h2>
          
          <form onSubmit={step === 1 ? handleNextStep : handleSubmit}>
            {step === 1 ? (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="email">
                    メールアドレス
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="pl-10 w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="nickname">
                    ニックネーム
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="nickname"
                      name="nickname"
                      type="text"
                      value={formData.nickname}
                      onChange={handleChange}
                      required
                      className="pl-10 w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="ニックネーム"
                    />
                  </div>
                </div>
                
                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleNextStep}
                  className="mt-4"
                >
                  次へ <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </>
            ) : (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    生年月日
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <select
                      name="birthYear"
                      value={formData.birthYear}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {years.map(year => (
                        <option key={year} value={year}>{year}年</option>
                      ))}
                    </select>
                    <select
                      name="birthMonth"
                      value={formData.birthMonth}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {months.map(month => (
                        <option key={month} value={month}>{month}月</option>
                      ))}
                    </select>
                    <select
                      name="birthDay"
                      value={formData.birthDay}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {days.map(day => (
                        <option key={day} value={day}>{day}日</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    性別
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <label className="flex items-center justify-center px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formData.gender === 'male'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <span className={`text-center ${formData.gender === 'male' ? 'text-purple-600 font-medium' : 'text-gray-700'}`}>
                        男性
                      </span>
                    </label>
                    <label className="flex items-center justify-center px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formData.gender === 'female'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <span className={`text-center ${formData.gender === 'female' ? 'text-purple-600 font-medium' : 'text-gray-700'}`}>
                        女性
                      </span>
                    </label>
                    <label className="flex items-center justify-center px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100">
                      <input
                        type="radio"
                        name="gender"
                        value="other"
                        checked={formData.gender === 'other'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <span className={`text-center ${formData.gender === 'other' ? 'text-purple-600 font-medium' : 'text-gray-700'}`}>
                        その他
                      </span>
                    </label>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                >
                  登録する
                </Button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;