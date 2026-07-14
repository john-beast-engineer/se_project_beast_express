const { JWT_SECRET = "dev-secret-key" } = process.env;

const ADMIN_EMAIL = "john@bethebeast.ai";

module.exports = { JWT_SECRET, ADMIN_EMAIL };
