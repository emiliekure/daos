import { useState } from "react";
import SecondaryButton from "../../atoms/buttons/SecondaryButton";
import InstrumentSelect from "../../atoms/forms/InstrumentSelect";
import PostList from "../../shared/PostList";
import styles from "./AllPosts.module.css";
import FilterButton from "./shared/FilterButton";
import InstrumentFilterSelect from "../../atoms/forms/InstrumentFilterSelect";
import SearchField from "../../atoms/forms/SearchField";

export default function AllPosts({
	posts,
	fetchPosts,
	isLoggedIn,
	setIsLoggedIn,
	searchTerm,
	setSearchTerm,
	instrumentSelect,
	setInstrumentSelect,
	sortTerm,
	setSortTerm,
}) {
	const [clicked, setClicked] = useState(false);
	return (
		<section className={styles.allPosts}>
			<div className={styles.header}>
				<h1>Posts</h1>
				<p id="resultCounter"></p>
				<div className={styles.filters}>
					<div className={styles.filterFields}>
						<SearchField
							type="search"
							max="120"
							placeholder="Search by location"
							value={searchTerm}
							onChange={(evt) => setSearchTerm(evt.target.value)}
						/>
						<InstrumentFilterSelect
							name="instrument"
							value={instrumentSelect}
							onChange={(evt) =>
								setInstrumentSelect(evt.target.value)
							}
						/>
					</div>

					<div className={styles.filterTabs}>
						<h3>Posttype</h3>
						<div className={styles.filterButtons}>
							<FilterButton
								type="button"
								text="All posts"
								value="all"
								onClick={(evt) => setSortTerm(evt.target.value)}
							/>
							<FilterButton
								type="button"
								text="Find ensembles"
								value="wanted"
								onClick={(evt) => setSortTerm(evt.target.value)}
							/>
							<FilterButton
								type="button"
								text="Find musicians"
								value="offered"
								onClick={(evt) => setSortTerm(evt.target.value)}
							/>
						</div>
					</div>
				</div>
			</div>
			<PostList
				posts={posts}
				fetchPosts={fetchPosts}
				isLoggedIn={isLoggedIn}
				setIsLoggedIn={setIsLoggedIn}
				searchTerm={searchTerm}
				instrumentFilter={instrumentSelect}
				sortTerm={sortTerm}
				slice={[]}
			/>
		</section>
	);
}
