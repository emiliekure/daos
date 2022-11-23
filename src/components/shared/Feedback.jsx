import styles from "./Feedback.module.css"

export default function Feedback() {
	return (
		<section className={styles.feedback}>
			<div className={styles.feedbackIcon}>
				<img src="../img/feedback.svg" alt="feedback icon" />
			</div>
			<div className={styles.feedbackText}>
				<h4>What are your thoughts on Tutti?</h4>
				<p>We would love to know any ideas you may have, on how we can improve the experience of our site.</p>
			</div>
		</section>
	)
}