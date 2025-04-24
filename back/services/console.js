const LogError = async (message, error = "") => {
  console.error(`[ERROR] ${message} ${error ? error : ""}`);
};
const LogSuccess = async (message, result = "") => {
  console.error(`[SUCCESS] ${message} ${result ? result : ""}`);
};

module.exports = {
  LogError,
  LogSuccess,
};
