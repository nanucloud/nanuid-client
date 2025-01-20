import React, { useState, useRef } from "react";
import VirtualKeypad from "./VirtualKeypad";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

interface RegisterFormProps {
  formData: {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    birthDate: string;
    pin: string;
    confirmPin: string;
    termsAccepted: boolean;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPinChange: (name: string, value: string) => void;
  onRegister: () => void;
  isMobile?: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  formData,
  onInputChange,
  onPinChange,
  onRegister,
  isMobile = false,
}) => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentPinField, setCurrentPinField] = useState<"pin" | "confirmPin">(
    "pin"
  );

  const mobileStyles = {
    wrapper: "min-h-screen bg-white flex flex-col", // flexbox를 이용해 세로 정렬
    container: "flex flex-col p-4 pt-6", // 세로 방향으로 아이템 배치
    title: "text-3xl font-bold mb-6",
    inputBase:
      "w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none",
    button: "w-full py-4 rounded-lg font-medium",
    pinContainer: "mt-8",
    pinBox: "w-12 h-12 border-2 rounded-lg",
  };

  const desktopStyles = {
    container: "relative flex-1 flex items-center justify-center p-6",
    title: "text-4xl font-bold mb-8",
    inputBase:
      "w-full px-0 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none",
    button: "flex-1 py-3 rounded",
    pinContainer: "space-y-4",
    pinBox: "w-10 h-10 border-b-2",
  };

  const styles = isMobile ? mobileStyles : desktopStyles;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (step < 6) {
        handleNavigation(step + 1, "next");
      } else {
        onRegister();
      }
    }
  };

  const handlePinKeyPress = (key: string) => {
    const currentValue = formData[currentPinField];
    if (currentValue.length < 6) {
      onPinChange(currentPinField, currentValue + key);
    }
  };

  const handlePinDelete = () => {
    const currentValue = formData[currentPinField];
    if (currentValue.length > 0) {
      onPinChange(currentPinField, currentValue.slice(0, -1));
    }
  };

  const handlePinClear = () => {
    onPinChange(currentPinField, "");
  };

  const validateForm = () => {
    switch (step) {
      case 1:
        if (!formData.email) {
          toast.error("이메일을 입력해주세요.");
          return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
          toast.error("유효한 이메일 주소를 입력해주세요.");
          return false;
        }
        break;
      case 2:
        if (!formData.name) {
          toast.error("이름을 입력해주세요.");
          return false;
        }
        break;
      case 3:
        if (!formData.birthDate) {
          toast.error("생년월일을 입력해주세요.");
          return false;
        }
        break;
      case 4:
        if (!formData.password || !formData.confirmPassword) {
          toast.error("비밀번호와 비밀번호 확인을 입력해주세요.");
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          toast.error("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
          return false;
        }
        if (formData.password.length < 8) {
          toast.error("비밀번호는 8자 이상이어야 합니다.");
          return false;
        }
        break;
      case 5:
        if (!formData.pin) {
          toast.error("PIN 번호를 입력해주세요.");
          return false;
        }
        break;
      case 6:
        if (!formData.termsAccepted) {
          toast.error("이용 약관에 동의해야 합니다.");
          return false;
        }
        break;
      default:
        break;
    }
    return true;
  };

  const handlePrevStep = () => {
    if (step > 1) {
      handleNavigation(step - 1, "prev", true);
    }
  };

  const handleNavigation = (
    nextStep: number,
    dir: "next" | "prev",
    bypassValidate?: boolean
  ) => {
    if (!bypassValidate && !validateForm()) return;

    if (isMobile) {
      setStep(nextStep);
    } else {
      setDirection(dir);
      const container = containerRef.current;
      if (container) {
        container.classList.add("transition-transform", "duration-300");
        container.style.transform =
          dir === "next" ? "translateX(-50%)" : "translateX(50%)";

        setTimeout(() => {
          setStep(nextStep);
          container.classList.remove("transition-transform");
          container.style.transform =
            dir === "next" ? "translateX(50%)" : "translateX(-50%)";

          requestAnimationFrame(() => {
            container.classList.add("transition-transform");
            container.style.transform = "translateX(0)";
          });
        }, 300);
      }
    }
  };

  const renderStep = () => {
    const steps = {
      1: {
        title: "👋 이메일을 알려주세요",
        subtitle:
          "NANU ID에 사용할 이메일을 입력해 주세요.\n한 번 입력 후 변경이 어려워요.",
        input: (
          <input
            required
            type="email"
            name="email"
            placeholder="이메일을 입력해 주세요"
            className="w-full px-0 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
            value={formData.email}
            onChange={onInputChange}
          />
        ),
      },
      2: {
        title: "👤 이름이 어떻게 되시나요?",
        subtitle: "서비스 이용을 위해 필요한 정보입니다.",
        input: (
          <input
            type="text"
            name="name"
            placeholder="이름을 알려주세요"
            className="w-full px-0 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
            value={formData.name}
            onChange={onInputChange}
          />
        ),
      },
      3: {
        title: "🎂 생년월일을 알려주세요",
        subtitle: "서비스 이용을 위해 필요한 정보입니다.",
        input: (
          <input
            type="date"
            name="birthDate"
            placeholder="생년월일"
            className="w-full px-0 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
            value={formData.birthDate}
            onChange={onInputChange}
          />
        ),
      },
      4: {
        title: "🔐 안전한 비밀번호를 설정해주세요",
        subtitle:
          "영문, 숫자, 특수문자를 포함한\n8자 이상의 비밀번호를 입력해주세요.",
        input: (
          <div className="space-y-4">
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              className="w-full px-0 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
              value={formData.password}
              onChange={onInputChange}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="비밀번호 확인"
              className="w-full px-0 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
              value={formData.confirmPassword}
              onChange={onInputChange}
            />
          </div>
        ),
      },
      5: {
        title: "🔒 PIN 번호를 설정해주세요",
        subtitle: "6자리 숫자를 입력해 주세요.\nNANU ID의 보안에 필요해요.",
        input: (
          <div className="space-y-4">
            <div className="flex justify-between">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 border-b-2 flex items-center justify-center text-xl"
                >
                  {formData[currentPinField][i] ? "•" : ""}
                </div>
              ))}
            </div>
            <VirtualKeypad
              onKeyPress={handlePinKeyPress}
              onDelete={handlePinDelete}
              onClear={handlePinClear}
            />
          </div>
        ),
      },
      6: {
        title: "📜 이용 약관에 동의해 주세요",
        subtitle: "서비스 이용을 위해 약관에 동의해 주세요.",
        input: (
          <div className="flex flex-col">
            <div className="text-sm text-gray-600 mb-4">
              <p>
                <a
                  href="/terms-of-service"
                  className="text-blue-600 hover:underline"
                >
                  서비스 이용 약관
                </a>
              </p>
              <p>
                <a
                  href="/privacy-policy"
                  className="text-blue-600 hover:underline"
                >
                  개인정보 처리방침
                </a>
              </p>
              <p>
                <a
                  href="/cookie-policy"
                  className="text-blue-600 hover:underline"
                >
                  쿠키 정책
                </a>
              </p>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                name="termsAccepted"
                id="termsAccepted"
                checked={formData.termsAccepted}
                onChange={onInputChange}
                className="h-4 w-4 text-blue-600 rounded border-gray-300"
              />
              <label
                htmlFor="termsAccepted"
                className="ml-2 text-sm text-gray-600"
              >
                상기의 이용 약관을 읽었으며 동의합니다.
              </label>
            </div>
          </div>
        ),
      },
    };

    const currentStep = steps[step as keyof typeof steps];

    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h2
            className={isMobile ? "text-xl font-medium" : "text-xl font-medium"}
          >
            {currentStep.title}
          </h2>
          <p className="text-gray-600 whitespace-pre-line">
            {currentStep.subtitle}
          </p>
        </div>
        {currentStep.input}
        <div
          className={`flex ${
            isMobile ? "flex-col space-y-3" : "space-x-3"
          } pt-4`}
        >
          {step > 1 && (
            <button
              type="button"
              onClick={() => handleNavigation(step - 1, "prev", true)}
              className={`${styles.button} border border-blue-600 text-blue-600 hover:bg-blue-50`}
            >
              이전
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              if (step === 6) onRegister();
              else handleNavigation(step + 1, "next");
            }}
            className={`${styles.button} bg-blue-600 text-white hover:bg-blue-700`}
          >
            {step === 6 ? "회원가입" : "다음"}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container} onKeyDown={handleKeyDown} tabIndex={0}>
      <div className={isMobile ? "w-full" : "w-[310px]"}>
        <h1 className={styles.title}>회원가입</h1>
        <div
          ref={containerRef}
          className={`transform ${
            !isMobile ? "transition-transform duration-300" : ""
          }`}
        >
          {renderStep()}
        </div>
        {step !== 5 && (
          <div
            className={`${
              isMobile ? "mt-8" : "absolute bottom-10 left-0 right-0"
            } text-center text-sm text-gray-600`}
          >
            이미 계정이 있으신가요?{" "}
            <Link
              to={isMobile ? "/app/login" : "/login"}
              className="text-blue-600 hover:underline"
            >
              로그인
            </Link>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegisterForm;
