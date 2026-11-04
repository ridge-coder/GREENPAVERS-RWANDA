ALTER TABLE requests
  MODIFY COLUMN status ENUM(
    'Pending',
    'In progress',
    'Fulfilled',
    'Confirmed',
    'In Production',
    'Ready',
    'Completed',
    'Cancelled'
  ) NOT NULL DEFAULT 'Pending';

UPDATE requests SET status = 'In Production' WHERE status = 'In progress';
UPDATE requests SET status = 'Completed' WHERE status = 'Fulfilled';

ALTER TABLE requests
  MODIFY COLUMN status ENUM(
    'Pending',
    'Confirmed',
    'In Production',
    'Ready',
    'Completed',
    'Cancelled'
  ) NOT NULL DEFAULT 'Pending';