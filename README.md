# ServiceNow Internal Time Tracking (Proof of Concept)

ServiceNow Enthusiast | Solving problems and simplifying workflows to make daily work easier for every team.

##  Project Overview
This project is a custom-scoped application for ServiceNow designed to track time spent by multiple agents on a single Case (ITSM/CSM). It provides a seamless way for primary assignees and co-assignees to log their effort without interfering with each other's data.

---

##  Technical Implementation: Multi-User Timer Logic

To ensure accurate data collection when multiple agents (Assignee & Co-Assignees) work on a Case simultaneously, the following technical logic is implemented:

### 1. Multi-Agent Concurrency Control
* **Independent Tracking:** Each timer session is unique to a `User + Case` combination. This allows an Assignee and several Co-Assignees to run their own timers at the same time without data collision.
* **Server-Side Validation:** A Business Rule ensures that a single user cannot start more than one active timer per Case.

### 2. UI Action Logic (The Buttons)
* **Dynamic Visibility:** Buttons use a Script Include to check the user's role in real-time. The "Start" button only appears if the user is the `assigned_to` agent or present in the `co-assignee` table.
* **State Management:** When an agent clicks **Start**, the system initializes a record in `x_time_log_entry` with a running state and a start time.
* **Calculation on Stop:** Upon clicking **Stop**, the system captures the end time and calculates the duration in minutes automatically.

---

##  Repository Structure
* **/scripts**: Contains the Business Rules and Script Includes used for the logic.
* **README.md**: Project documentation and technical overview.

---

##  Future Enhancements
* Dashboard for managers to view total time spent per team.
* Automated report generation for monthly billing or performance tracking.
