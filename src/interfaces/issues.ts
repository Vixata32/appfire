export interface IssueLink {
    id: string;
    fields: {
      summary: string;
      created: string;
      assignee: {
        displayName: string;
      };
      status: {
        name: string;
      };
      priority: {
        name: string;
      };
    };
    type: {
      inward: string;
      outward: string;
    };
  }
  