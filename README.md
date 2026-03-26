## ⚙️ Technical Implementation: Multi-User Timer Logic

To ensure accurate data collection when multiple agents (Assignee & Co-Assignees) work on a Case simultaneously, the following technical logic is implemented:

### 1. Multi-Agent Concurrency Control
* **[span_0](start_span)Independent Tracking**: Each timer session is unique to a `User + Case` combination[span_0](end_span). [span_1](start_span)This allows an Assignee and several Co-Assignees to run their own timers at the same time without data collision[span_1](end_span).
* **[span_2](start_span)Server-Side Validation**: A Business Rule ensures that a single user cannot start more than one active timer per Case[span_2](end_span).

### 2. UI Action Logic (The Buttons)
* **Dynamic Visibility**: Buttons use a Script Include to check the user's role in real-time. [span_3](start_span)The "Start" button only appears if the user is the `assigned_to` agent or present in the `co-assignee` table[span_3](end_span).
* **[span_4](start_span)State Management**: When an agent clicks **Start**, the system initializes a record in `x_time_log_entry` with a `running` state and a `start_time` timestamp[span_4](end_span).
* **[span_5](start_span)[span_6](start_span)Calculation on Stop**: Upon clicking **Stop**, the system captures the `end_time`, calculates the difference, and stores the final duration in minutes directly on the record[span_5](end_span)[span_6](end_span).

### 3. Real-Time Agent Experience
* **[span_7](start_span)[span_8](start_span)Live Polling**: To avoid constant page refreshes, a Client Script uses `GlideAjax` to poll the active timer status[span_7](end_span)[span_8](end_span).
* **[span_9](start_span)[span_10](start_span)Visual Counter**: A `setInterval()` function updates a live clock (HH:MM:SS) in the Case header, providing immediate feedback to the agent that their time is being tracked[span_9](end_span)[span_10](end_span).
