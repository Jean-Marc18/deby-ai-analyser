import ScoreGauge from "../ScoreGauge";

const ScoreBadge = ({ score }: { score: number }) => {
  const badgeColor =
    score > 69
      ? "bg-badge-green"
      : score > 49
        ? "bg-badge-yellow"
        : "bg-badge-red";
  const textColor =
    score > 69
      ? "text-green-600"
      : score > 49
        ? "text-yellow-600"
        : "text-red-600";
  const badgeText =
    score > 69
      ? "Fort"
      : score > 49
        ? "Bon démarrage"
        : "Besoin d'amélioration";

  return (
    <div className={`score-badge ${badgeColor}`}>
      <p className={`text-xs ${textColor} font-semibold`}>{badgeText}</p>
    </div>
  );
};

const Category = ({ title, score }: { title: string; score: number }) => {
  const textColor =
    score > 69
      ? "text-green-600"
      : score > 49
        ? "text-yellow-600"
        : "text-red-600";

  return (
    <div className="resume-summary">
      <div className="category">
        <div className="flex flex-row gap-2 items-center justify-center">
          <p className="text-2xl">{title}</p>
          <ScoreBadge score={score} />
        </div>
        <p className="text-2xl ">
          <span className={textColor}>{score}</span>/100
        </p>
      </div>
    </div>
  );
};

const Summary = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md w-full">
      <div className="flex flex-row max-sm:flex-col  items-center p-4 gap-8">
        <ScoreGauge score={feedback.overallScore} />
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Votre score de CV</h2>
          <p className="text-sm text-gray-500">
            Ce score est calculé en fonction des variables listées ci-dessous.
          </p>
        </div>
      </div>
      <Category title="Tonalité et style" score={feedback.toneAndStyle.score} />
      <Category title="Contenu" score={feedback.content.score} />
      <Category title="Structure" score={feedback.structure.score} />
      <Category title="Compétences" score={feedback.skills.score} />
    </div>
  );
};

export default Summary;
