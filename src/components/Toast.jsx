export function Toast(title="",status="success", description="") {
  return {
    title: title,
    description: description,
    status: status,
    duration: 3000,
    isClosable: true,
  };
}
