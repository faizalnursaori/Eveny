import { ExplanationCard } from "./ExplanationCard";

//komponen untuk "How eveny works?"

export default function Explanation() {
  return (
    <>
      <div className="mt-4 grid w-full grid-cols-1 md:grid-cols-3 gap-4 px-12">
        <ExplanationCard
          title="Explore Events"
          description="Try something new, or do more of what you love."
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-heart"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
            </svg>
          }
        />
        <ExplanationCard
          title="Create Events"
          description="Create your events & reach your people."
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-calendar-plus"
            >
              <path d="M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8"></path>
              <line x1="16" x2="16" y1="2" y2="6"></line>
              <line x1="8" x2="8" y1="2" y2="6"></line>
              <line x1="3" x2="21" y1="10" y2="10"></line>
              <line x1="19" x2="19" y1="16" y2="22"></line>
              <line x1="16" x2="22" y1="19" y2="19"></line>
            </svg>
          }
        />
        <ExplanationCard
          title="Review and Rating"
          description="Review and rate the events you have attended."
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-message-circle-more"
            >
              <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
              <path d="M8 12h.01" />
              <path d="M12 12h.01" />
              <path d="M16 12h.01" />
            </svg>
          }
        />
      </div>
    </>
  );
}
