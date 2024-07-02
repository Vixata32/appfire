import React, { useState, useEffect } from "react";
import ForgeUI, { render, Fragment, Text, IssuePanel, useProductContext, Select, Option, Button } from "@forge/ui";
import { fetchLinkedIssues, deleteIssueLink } from "./helpers/issues";
import { sortIssues } from "./helpers/sort";
import { IssueLink } from "./interfaces/issues";
import { PlatformContext } from "./interfaces/context";

const App = () => {
  const context = useProductContext();

  // Type guard to check if context is of type PlatformContext
  const isPlatformContext = (context: any): context is PlatformContext => {
    return context?.platformContext?.issueKey !== undefined;
  };

  if (!isPlatformContext(context)) {
    return <Text>Error: Could not determine issue context.</Text>;
  }

  const issueKey = context.platformContext.issueKey;

  const [linkedIssues, setLinkedIssues] = useState<IssueLink[]>([]);
  const [sortBy, setSortBy] = useState<string>("summary");

  useEffect(() => {
    const fetchIssues = async () => {
      if (issueKey) {
        const issues = await fetchLinkedIssues(issueKey);
        setLinkedIssues(sortIssues(issues, sortBy));
      }
    };
    fetchIssues();
  }, [issueKey, sortBy]);

  const handleDelete = async (linkId: string) => {
    if (issueKey) {
      await deleteIssueLink(issueKey, linkId);
      const issues = await fetchLinkedIssues(issueKey);
      setLinkedIssues(sortIssues(issues, sortBy));
    }
  };

  return (
    <Fragment>
      <Select label="Sort By" name="select">
        <Option label="Summary" value="summary" />
        <Option label="Create Date" value="created" />
        <Option label="Assignee" value="assignee" />
        <Option label="Status" value="status" />
        <Option label="Priority" value="priority" />
      </Select>
      {linkedIssues.map(issue => (
        <Fragment key={issue.id}>
          <Text>Summary: {issue.fields.summary}</Text>
          <Text>Created: {new Date(issue.fields.created).toLocaleDateString()}</Text>
          <Text>Assignee: {issue.fields.assignee?.displayName || "Unassigned"}</Text>
          <Text>Status: {issue.fields.status.name}</Text>
          <Text>Priority: {issue.fields.priority.name}</Text>
          <Button text="Delete" onClick={() => handleDelete(issue.id)} />
        </Fragment>
      ))}
    </Fragment>
  );
};

export const run = render(<IssuePanel><App /></IssuePanel>);
