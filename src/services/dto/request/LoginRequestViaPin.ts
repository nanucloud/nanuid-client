import { DeviceType } from '../../../types/DeviceType';
import { LoginRequest } from './LoginRequest';

export function loginRequestViaPin(data: LoginRequest): any {
  return {
    email: data.email,
    password: data.password,
    recaptchaToken: data.recaptchaToken,
    pin: data.pin,
    deviceType: getDeviceType(),
  };
}

function getDeviceType(): DeviceType {
  const userAgent = navigator.userAgent;

  if (/Android/i.test(userAgent)) {
    return DeviceType.ANDROID;
  } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
    return DeviceType.IOS;
  } else if (/Windows NT/i.test(userAgent)) {
    return DeviceType.WINDOWS;
  } else if (/Macintosh/i.test(userAgent)) {
    return DeviceType.MAC;
  } else {
    return DeviceType.WEB_UNKNOWN;
  }
}