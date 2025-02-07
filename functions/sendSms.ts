type SendSmsOptions = {
  from: string;
  to: string;
  message: string;
};

export async function sendSms({
  from,
  to,
  message: msg,
}: SendSmsOptions): Promise<void> {
  try {
    const url = new URL("https://api.voodoosms.com/sendsms");

    const response = await fetch(url.toString(), {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.VOODOO_SMS_API_KEY}` },
      body: JSON.stringify({
        from,
        to,
        msg,
      }),
    });
    const data = await response.json();
    console.log({ data });
    return data;
  } catch (error) {
    console.error("Failed to send SMS: ", error);
  }
}
