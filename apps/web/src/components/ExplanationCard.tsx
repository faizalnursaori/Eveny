import { ExplanationCardProps } from "@/utils/types/ExplanationTypes";
import React from "react";

export const ExplanationCard: React.FC<ExplanationCardProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <div>
      <div className="rounded-lg border border-base-300 bg-base-200 p-12">
        <div className="space-y-8">
          <div className="w-fit rounded-md bg-indigo-600 p-2">{icon}</div>
          <div>
            <span className="text-3xl">{title}</span>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
