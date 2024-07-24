module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!axios/)"],
  moduleFileExtensions: ["js", "jsx", "json"],
  testMatch: ["<rootDir>/src/**/*.(test|spec).{js,jsx}"],
};
