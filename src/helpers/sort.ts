import { IssueLink } from "../interfaces/issues";

export const sortIssues = (issues: IssueLink[], sortBy: string): IssueLink[] => {
  const sortedIssues = [...issues];
  sortedIssues.sort((a, b) => {
    switch (sortBy) {
      case "summary":
        return a.fields.summary.localeCompare(b.fields.summary);
      case "created":
        return new Date(a.fields.created).getTime() - new Date(b.fields.created).getTime();
      case "assignee":
        return (a.fields.assignee?.displayName || "").localeCompare(b.fields.assignee?.displayName || "");
      case "status":
        return a.fields.status.name.localeCompare(b.fields.status.name);
      case "priority":
        return a.fields.priority.name.localeCompare(b.fields.priority.name);
      default:
        return 0;
    }
  });
  return sortedIssues;
};
