import { useTranslation } from "react-i18next";
import { Link } from "react-router";

const Landing = () => {
  const { t } = useTranslation();

  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="max-w-2xl text-center space-y-6 px-4">
        <h1 className="text-4xl font-bold">{t("demoTitle")}</h1>

        <div className="space-y-4">
          <p className="text-lg">{t("demoDescription")}</p>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <p className="text-yellow-800">{t("demoInstruction")}</p>
          </div>
        </div>

        <Link
          to="/admin"
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors"
        >
          <p className="text-blue-800">{t("adminInstruction")}</p>
        </Link>
      </div>
    </div>
  );
};

export { Landing };
