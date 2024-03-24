import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import cl from './Accordion.module.scss'
import ProductItem from '../ProductItem/ProductItem'

export default function ControlledAccordions({ image, ...order }) {
	const [expanded, setExpanded] = React.useState(false)

	const handleChange = panel => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false)
	}

	const productList = order.order.map(product => (
		<ProductItem
			key={product.product._id}
			quantity={product.quantity}
			shop={product.shop.name}
			product={product.product}
			image={image}
		/>
	))
	//! remake on a photo from the server
	const duplicateImg = Array.from({ length: order.order.length }, () => <img src={image} alt='medicines' />)

	return (
		<Accordion expanded={expanded === 'panel1'} sx={{ backgroundColor: '#8aecb1' }} onChange={handleChange('panel1')}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<div className={cl.flex}>
					<Typography style={{ fontWeight: 600 }}>#{order._id}</Typography>
					<Typography className={cl.imgProductPreview}>{duplicateImg}</Typography>
					<Typography style={{ fontWeight: 600 }}>Total price: {order.totalPrice}₴</Typography>
				</div>
			</AccordionSummary>
			<AccordionDetails>
				<div className={cl.userInfo}>
					<span className={cl.italicStyle}>Name: </span>
					{order.name}, <span className={cl.italicStyle}>Email: </span>
					{order.email}, <span className={cl.italicStyle}>Phone: </span>
					{order.phone}, <span className={cl.italicStyle}>Address: </span>
					{order.address}
				</div>
				<div className={cl.orderInfo}>{productList}</div>
			</AccordionDetails>
		</Accordion>
	)
}
