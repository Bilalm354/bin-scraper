type SendSmsOptions = {
  to: string;
  message: string;
};

export async function sendSms({
  to,
  message: msg,
}: SendSmsOptions): Promise<void> {
  try {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Not sending text on prod");
      return;
    }
    const url = new URL("https://api.voodoosms.com/sendsms");

    const response = await fetch(url.toString(), {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.VOODOO_SMS_API_KEY}` },
      body: JSON.stringify({
        from: "Bin Day",
        to,
        msg,
      }),
    });
    const data = await response.json();
    console.log({ data });
    if (data.error) {
      throw data.error.msg;
    }
    return data;
  } catch (error) {
    console.error("Failed to send SMS: ", error);
  }
}
