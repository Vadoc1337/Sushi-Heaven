import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

function useLanguageChecker(): boolean {
    const languageIcon = useSelector((state: RootState) => state.sushi.languageIcon);
    return languageIcon.includes("en-language-icon");
}

export default useLanguageChecker;