/**
 * UI Action: Start Timer
 * Table: sn_customerservice_case
 * Condition: current.active == true && new x_time_tracker_utils().hasNoActiveTimer(current.sys_id, gs.getUserID())
 */

[span_0](start_span)[span_1](start_span)// Initialize a new record in the custom time log table[span_0](end_span)[span_1](end_span)
var log = new GlideRecord('x_time_log_entry');
log.initialize();

[span_2](start_span)[span_3](start_span)// Set link to the current Case and the current User[span_2](end_span)[span_3](end_span)
log.setValue('case', current.sys_id);
log.setValue('user', gs.getUserID());
log.setValue('start_time', new GlideDateTime()); [span_4](start_span)// Capture start timestamp[span_4](end_span)
log.setValue('state', 'running'); [span_5](start_span)// Set initial state[span_5](end_span)

[span_6](start_span)// Logic to determine user's role on the ticket[span_6](end_span)
var role = (current.assigned_to == gs.getUserID()) ? 'assignee' : 'co_assignee'; 
log.setValue('role', role);

log.setValue('billable', true); [span_7](start_span)// Default to billable[span_7](end_span)

[span_8](start_span)// Insert the record into the database[span_8](end_span)
log.insert();

// Refresh the Case form to update the UI
action.setRedirectURL(current);
