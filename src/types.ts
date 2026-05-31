/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface StudentSubmission {
  email: string;
  fullName: string;
  examType: string[];
  stateOrCity: string;
  joinDate: string;
  queueNumber: number;
}

export interface ActivityFeedItem {
  id: string;
  name: string;
  city: string;
  exam: string;
  timeAgo: string;
}
