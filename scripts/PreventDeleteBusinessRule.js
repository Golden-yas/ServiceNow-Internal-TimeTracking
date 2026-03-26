/**
 * Business Rule: Prevent Deletion of Stopped Logs
 * Table: x_time_log_entry
 * When: Before / Delete
 * Description: Ensures that once a time entry is stopped and finalized, 
 * it cannot be deleted to maintain a perfect audit trail for billing.
 */

(function executeRule(current, previous /*null when async*/) {

    // Check if the timer state is 'stopped' (finalized)
    if (current.state == 'stopped') {
        // Stop the deletion and display an error message to the user
        gs.addErrorMessage("Security Violation: Completed time entries cannot be deleted for auditing and billing integrity.");
        current.setAbortAction(true);
    }

})(current, previous);
