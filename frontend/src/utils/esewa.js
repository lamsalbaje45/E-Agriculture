export function submitEsewaPayment(esewaPayload) {
  if (!esewaPayload?.action || !esewaPayload?.fields) {
    throw new Error("Invalid eSewa payload.");
  }

  const form = document.createElement("form");
  form.method = "POST";
  form.action = esewaPayload.action;

  Object.entries(esewaPayload.fields).forEach(([name, value]) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = String(value ?? "");
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
}
