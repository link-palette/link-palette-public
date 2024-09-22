import express from "express";
import fetch from "node-fetch"; // node-fetch 모듈 사용
import dotenv from "dotenv";
import cors from "cors";

dotenv.config(); // 환경 변수를 불러오는 코드를 추가

const app = express();
app.use(express.json()); // JSON 요청 본문 처리
app.use(cors());

const PORT = process.env.PORT || 3001;

// 기존에 중복된 app.listen 제거
app.get("/api/colors/:keyword", async (req, res) => {
  const keyword = req.params.keyword;
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`;

  try {
    const requestBody = {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Given the keyword '${encodeURIComponent(
                keyword
              )}', suggest 3 main solid colors and 2 gradient colors. The solid colors should be in HEX codes. The gradient colors should be in the format of 'linear-gradient(to right, #hexcode, #hexcode)'. You must recommend at least 5 colors in total.`,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 100,
      },
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("API 응답 오류:", data);
      res.status(500).json({ message: "Internal Server Error", error: data });
    } else if (!data.candidates || data.candidates.length === 0) {
      console.error(
        "API 응답은 성공했으나, 'candidates' 데이터가 비어 있습니다."
      );
      res.status(500).json({ message: "No data in candidates array" });
    } else {
      const candidate = data.candidates[0];
      const textContent = candidate.content.parts
        .map((part) => part.text)
        .join(" ");
      const colors = extractColors(textContent);

      res.json({
        mainColor: colors.mainColor,
        subColors: colors.subColors,
        gradientColors: colors.gradientColors,
      });
    }
  } catch (error) {
    console.error("API 호출 실패:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

function extractColors(text) {
  // HEX 코드와 그라데이션 패턴을 모두 찾을 수 있는 정규 표현식
  const colorRegex = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\b/g;
  const gradientRegex =
    /linear-gradient\(to right, #([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}), #([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\)/g;

  const colorMatches = text.match(colorRegex) || [];
  const gradientMatches = text.match(gradientRegex) || [];

  // 단색과 그라데이션 색상을 분리하여 반환
  return {
    mainColor: colorMatches.length > 0 ? colorMatches[0] : null,
    subColors: colorMatches.slice(1, 4),
    gradientColors: gradientMatches.slice(0, 2),
  };
}

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
