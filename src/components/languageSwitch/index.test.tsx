import { render } from "@testing-library/react";
import LanguageSwitch from "./index";

// Mock the useTranslation hook
jest.mock("react-i18next", () => ({
    useTranslation: () => ({
      t: (key: string) => key,
      i18n: {
        changeLanguage: jest.fn(),
        language: "en",
      },
    }),
  }));

describe("snapshots", () => {
  it("should match snapshot", () => {
    const { container } = render(<LanguageSwitch />);

    expect(container).toMatchSnapshot();
  });
});
