import { mockTelegramEnv, parseInitData } from "@telegram-apps/sdk";

// This function mocks the Telegram environment for development
export function mockEnvironment() {
    // Check if we are in a development environment and not inside Telegram
    if (process.env.NODE_ENV === "development" && !window.Telegram?.WebApp) {
        const initDataRaw = new URLSearchParams([
            [
                "user",
                JSON.stringify({
                    id: 123456789,
                    first_name: "Telegram",
                    last_name: "User",
                    username: "telegram_user",
                    language_code: "en",
                    is_premium: true,
                }),
            ],
            ["auth_date", "1716922846"],
            ["hash", "mock_hash_for_development"],
        ]).toString();

        mockTelegramEnv({
            themeParams: {
                bgColor: "#17212b",
                textColor: "#ffffff",
                hintColor: "#708499",
                linkColor: "#6ab3f3",
                buttonColor: "#5288c1",
                buttonTextColor: "#ffffff",
            },
            initData: parseInitData(initDataRaw),
            initDataRaw,
        });
    }
}
