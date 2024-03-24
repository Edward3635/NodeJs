import * as React from 'react'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'

export default function BasicAlerts({ severity, text }) {
	return (
		<Stack sx={{ width: '100%' }} spacing={2}>
			<Alert
				style={{
					justifyContent: 'center',
					borderTopRightRadius: 15,
					borderTopLeftRadius: 15,
					borderBottomLeftRadius: 0,
					borderBottomRightRadius: 0,
					borderBottom: '3px solid #deebfb'
				}}
				severity={severity}
			>
				{text}
			</Alert>
		</Stack>
	)
}
