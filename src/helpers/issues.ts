import api, { route } from "@forge/api";
import { IssueLink } from "../interfaces/issues";

export const fetchLinkedIssues = async (issueId: string): Promise<IssueLink[]> => {
  const response = await api.asApp().requestJira(route`/rest/api/3/issue/${issueId}?fields=issuelinks`);
  const data = await response.json();
  return data.fields.issuelinks.filter((link: IssueLink) => link.type.inward === "is blocked by" || link.type.outward === "blocks");
};

export const deleteIssueLink = async (issueId: string, linkId: string): Promise<void> => {
  await api.asApp().requestJira(route`/rest/api/3/issue/${issueId}/remotelink/${linkId}`, {
    method: "DELETE"
  });
};
