import { Memory } from "../types";

export class MemorySystem implements Memory {
  private entries: any[] = [];

  addEntry(entry: any): void {
    this.entries.push({
      ...entry,
      timestamp: Date.now(),
    });
  }

  async getRelevantContext(query: string): Promise<any> {
    // Implement relevance scoring and context retrieval
    return this.entries
      .filter((entry) => this.isRelevant(entry, query))
      .slice(-5); // Return last 5 relevant entries
  }

  private isRelevant(entry: any, query: string): boolean {
    // Simple implementation - could be enhanced with more sophisticated matching
    const entryStr = JSON.stringify(entry).toLowerCase();
    const queryTerms = query.toLowerCase().split(" ");
    return queryTerms.some((term) => entryStr.includes(term));
  }

  clearMemory(): void {
    this.entries = [];
  }

  getEntries(): any[] {
    return this.entries;
  }
}
