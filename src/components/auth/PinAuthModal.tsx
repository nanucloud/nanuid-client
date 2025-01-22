import React, { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import VirtualKeypad from "./VirtualKeypad";

interface PinAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (pin: string, captchaToken: string) => void;
  onCaptchaChange: (newToken: string) => void;
}

const PinAuthModal: React.FC<PinAuthModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onCaptchaChange,
}) => {
  const [step, setStep] = useState<"captcha" | "pin">("captcha");
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [pin, setPin] = useState<string>(""); 
  const [captchaExpired, setCaptchaExpired] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setStep("captcha");
      setPin("");
      setCaptchaExpired(false); 
    }
  }, [isOpen]);

  const handleRecaptchaChange = (token: string | null) => {
    if (token) {
      setRecaptchaToken(token);
      onCaptchaChange(token);
      console.log(token)
      setStep("pin");
      setCaptchaExpired(false);
    } else {
      setRecaptchaToken(null);
      setCaptchaExpired(true);
    }
  };

  const handleKeyPress = (key: string) => {
    if (pin.length < 6) {
      setPin((prev) => prev + key);
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setPin("");
  };

  const handleSubmit = () => {
    if (pin.length === 6 && recaptchaToken) {
      onSubmit(pin, recaptchaToken);
      setPin(""); 
      onClose(); 
    }
  };

  const handleModalClose = () => {
    setStep("captcha");
    setPin("");
    setCaptchaExpired(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl p-6 w-[400px] max-w-[90vw]">
        {step === "captcha" ? (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">보안 인증</h2>
              <p className="text-gray-600 text-sm mb-6">
                NANU ID 앱을 설치하면 불필요한 캡챠 인증을 생략하고
                <br />
                빠르게 로그인할 수 있습니다
              </p>
            </div>
            <div className="flex justify-center">
              <ReCAPTCHA
                sitekey="6LdSu74qAAAAAKFs8haQHu4HO9y_QLeXzvsYdUWV"
                onChange={handleRecaptchaChange}
                onExpired={() => setCaptchaExpired(true)}
              />
            </div>
            {captchaExpired && (
              <div className="text-red-500 text-sm text-center mt-4">
                리캡챠 인증이 만료되었습니다. 다시 인증을 진행해주세요.
              </div>
            )}
            <button
              onClick={handleModalClose}
              className="w-full py-3 text-gray-500 hover:text-gray-700"
            >
              닫기
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">PIN 입력</h2>
              <p className="text-gray-600 text-sm">
                6자리 PIN 번호를 입력해주세요
              </p>
            </div>

            <div className="flex justify-center space-x-2">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="w-10 h-12 border-2 rounded-lg flex items-center justify-center"
                  >
                    {pin[i] ? "•" : ""}
                  </div>
                ))}
            </div>

            <VirtualKeypad
              onKeyPress={handleKeyPress}
              onDelete={handleDelete}
              onClear={handleClear}
            />

            <div className="flex space-x-2 mt-4">
              <button
                onClick={handleModalClose}
                className="w-1/2 py-3 text-gray-500 hover:text-gray-700"
              >
                취소
              </button>
              <button
                onClick={handleSubmit}
                disabled={pin.length !== 6 || !recaptchaToken}
                className="w-1/2 py-3 bg-blue-600 text-white rounded-lg disabled:bg-blue-300"
              >
                확인
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PinAuthModal;
