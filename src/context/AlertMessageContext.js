import React, { createContext, useState, useCallback } from "react";
import { Alert, Stack } from "@mui/material";
import { nanoid } from "nanoid";

const AlertMessageContext = createContext({});

export function AlertMessageProvider({ children }) {
  const [alerts, setAlerts] = useState([]);

  const postAlert = useCallback(
    (alert) => {
      setAlerts((alerts) => {
        alert.key = alert.key || nanoid();
        setTimeout(() => {
          setAlerts((alerts) => {
            return alerts.filter((m) => m.key !== alert.key);
          });
        }, 2000);
        return [...alerts, alert];
      });
    },
    [setAlerts]
  );

  const postSuccessAlert = useCallback(
    (message) => {
      postAlert({ type: "success", message });
    },
    [postAlert]
  );

  const postErrorAlert = useCallback(
    (message) => {
      postAlert({ type: "error", message });
    },
    [postAlert]
  );

  return (
    <AlertMessageContext.Provider
      value={{ postAlert, postSuccessAlert, postErrorAlert }}
    >
      <AlertMessages alerts={alerts} />
      {children}
    </AlertMessageContext.Provider>
  );
}

function AlertMessages({ alerts }) {
  return (
    <Stack
      spacing={2}
      style={{ padding: 10, position: "fixed", right: 0, zIndex: 99999 }}
    >
      {alerts.map((alert) => {
        return (
          <Alert key={alert.key} severity={alert.type}>
            {alert.message}
          </Alert>
        );
      })}
    </Stack>
  );
}

export default AlertMessageContext;