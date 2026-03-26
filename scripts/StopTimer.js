/**
 * UI Action: Stop Timer
 * Table: sn_customerservice_case
 * [span_5](start_span)Visibility: Visible when an active timer exists for current user[span_5](end_span)
 */

var log = new GlideRecord('x_time_log_entry'); [span_6](start_span)// Access the custom log table[span_6](end_span)
log.addQuery('case', current.sys_id); [span_7](start_span)// Filter by current Case[span_7](end_span)
log.addQuery('user', gs.getUserID()); [span_8](start_span)// Filter by current Technician[span_8](end_span)
log.addQuery('state', 'running');     [span_9](start_span)// Find only the active session[span_9](end_span)
log.query();

if (log.next()) {
    var end = new GlideDateTime(); [span_10](start_span)// Capture current timestamp[span_10](end_span)
    log.setValue('end_time', end); [span_11](start_span)// Set the stop time[span_11](end_span)
    
    [span_12](start_span)[span_13](start_span)// Calculate duration in minutes: (end_time - start_time)[span_12](end_span)[span_13](end_span)
    var diff = GlideDateTime.subtract(new GlideDateTime(log.start_time), end);
    var durationMinutes = Math.round(diff.getNumericValue() / 60000); 
    
    log.setValue('duration_minutes', durationMinutes); [span_14](start_span)// Store calculated duration[span_14](end_span)
    log.setValue('state', 'stopped'); [span_15](start_span)// Mark session as completed[span_15](end_span)
    log.update(); [span_16](start_span)// Save record[span_16](end_span)
}

[span_17](start_span)// Refresh the form to show the updated time logs[span_17](end_span)
action.setRedirectURL(current);
