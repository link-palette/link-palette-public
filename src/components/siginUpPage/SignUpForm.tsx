"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function SignUpForm() {
  const [idValue, setIdValue] = useState("");
  const [idError, setIdError] = useState("");
  const [error, setError] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setconfirmPasswordError] = useState("");
  const idChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdValue(e.target.value);
    if (idValue.length > 0) {
      setIdError("");
    }
  };
  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
    if (passwordValue.length > 0) {
      setPasswordError("");
    }
  };

  const confirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    if (confirmPassword.length > 0) {
      setconfirmPasswordError("");
    }
  };
  const handleError = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (idValue === "") {
      setError(true);
      setIdError("아이디를 작성해주셔야 합니다.");
    } else if (idValue !== `^[a-zA-Z][a-zA-Z0-9-_]{4,14}$`) {
      setError(true);
      setIdError("아이디는 영어 숫자 포함 5~15글자 사이여야만 합니다");
    }
    if (passwordValue === "") {
      setError(true);
      setPasswordError("비밀번호를 작성해주셔야 합니다.");
    } else if (passwordValue.length < 8) {
      setError(true);
      setPasswordError("비밀번호는 최소 8글자 이상이여야 합니다.");
    } else if (!/\d/ == !passwordValue) {
      setError(true);
      setPasswordError("비밀번호는 최소 하나의 숫자를 포함하여야 합니다.");
    }
    if (passwordValue !== confirmPassword) {
      setconfirmPasswordError("비밀번호와 일치하지 않습니다");
    }
  };
  return (
    <>
      <form className=" w-[500px]  " onSubmit={handleError}>
        <h1 className="font-black text-[40px] mb-[100px] text-center">
          SiginIn
        </h1>
        <label htmlFor="id">아이디</label>
        <Input
          id="id"
          value={idValue}
          type="text"
          placeholder="아이디를 입력해주세요"
          error={error}
          errorMessage={idError}
          onChange={idChange}
        />
        <label htmlFor="password">비밀번호 </label>
        <Input
          id="password"
          value={passwordValue}
          type="password"
          placeholder="비밀번호를 입력해주세요"
          error={error}
          errorMessage={passwordError}
          onChange={passwordChange}
        />
        <label htmlFor="confirmPassword">비밀번호 확인</label>
        <Input
          id="confirmPassword"
          value={confirmPassword}
          type="password"
          placeholder="비밀번호를 다시 입력해주세요"
          error={error}
          errorMessage={confirmPasswordError}
          onChange={confirmPasswordChange}
        />

        <Button className="w-full">회원가입하기</Button>
      </form>
    </>
  );
}
