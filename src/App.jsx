import "./App.scss";

import {
	Content,
	Header,
	HeaderGlobalAction,
	HeaderGlobalBar,
	HeaderName,
	Search,
	Dropdown,
	StructuredListWrapper,
	StructuredListHead,
	StructuredListRow,
	StructuredListCell,
	StructuredListBody,
} from "@carbon/react";
import LogoURL from "./images/logo.png";
import { PlayerData } from "./data/playerData";

import { Email, CalendarHeatMap as MenuIcon } from "@carbon/react/icons";
import React, { useEffect, useState } from "react";
function App() {
	const [filteredPlayerData, setFilteredPlayerData] = useState(PlayerData);
	const [searchValue, setSearchValue] = useState("");
	const [classFilter, setClassFilter] = useState("");
	const [teamFilter, setTeamFilter] = useState("");
	const ContentStyle = {
		height: "100%",
		padding: "0",
		marginBottom: "0px",
		width: "100%",
	};

	const iconSize = 30;

	// useEffect(() => {
	// 	const fpd =
	// 		classFilter === ""
	// 			? PlayerData
	// 			: PlayerData.filter((el) => el.team === classFilter);
	// 	setFilteredPlayerData(fpd);
	// }, [classFilter]);

	// useEffect(() => {
	// 	const lowerSearchVal = searchValue.toLowerCase();
	// 	const fpd =
	// 		searchValue === ""
	// 			? PlayerData
	// 			: PlayerData.filter((el) => {
	// 					const playerFirstText = el.first_name.toLowerCase();
	// 					const playerLastText = el.last_name.toLowerCase();
	// 					const playerNumber = el.number;
	// 					return (
	// 						el.team === searchValue ||
	// 						playerFirstText.includes(lowerSearchVal) ||
	// 						playerLastText.includes(lowerSearchVal) ||
	// 						playerNumber.includes(lowerSearchVal)
	// 					);
	// 			  });
	// 	setFilteredPlayerData(fpd);
	// }, [searchValue]);

	useEffect(() => {
		const lowerSearchVal = searchValue.toLowerCase();
		const filteredSearchResults =
			searchValue === ""
				? PlayerData
				: PlayerData.filter((el) => {
						const playerFirstText = el.first_name.toLowerCase();
						const playerLastText = el.last_name.toLowerCase();
						const playerNumber = el.number;
						return (
							el.team === searchValue ||
							playerFirstText.includes(lowerSearchVal) ||
							playerLastText.includes(lowerSearchVal) ||
							playerNumber.includes(lowerSearchVal)
						);
				  });
		const filteredTeamResults =
			teamFilter === ""
				? filteredSearchResults
				: filteredSearchResults.filter((el) => el.team === teamFilter);
		const filteredClassResults =
			classFilter === ""
				? filteredTeamResults
				: filteredTeamResults.filter((el) => el.class === classFilter);
		setFilteredPlayerData(filteredClassResults);
	}, [searchValue, classFilter, teamFilter]);

	const translateClass = (inClassStr) => {
		switch (inClassStr) {
			case "FR":
				return "Freshman";
			case "SO":
				return "Sophomore";
			case "JR":
				return "Junior";
			case "SR":
				return "Senior";
			default:
				return "";
		}
	};
	return (
		<div className="appContainer">
			<Header aria-label="IBM Platform Name">
				<img className="headerLogo" src={LogoURL} />
				<HeaderName className="AppName" href="#" prefix="Timberwolves">
					Football
				</HeaderName>

				<HeaderGlobalBar>
					<HeaderGlobalAction
						aria-label="Contact Developer"
						href="mailto:madkidflash@gmail.com?subject=Help with bvsw football app"
					>
						<Email size={iconSize} />
					</HeaderGlobalAction>
				</HeaderGlobalBar>
			</Header>

			<Content id="main-content" style={ContentStyle}>
				<section className="TableShow appDataTable">
					<div className="playerTableSearchBar">
						<Search
							key="SearchControl"
							id="playerSearchControl"
							labelText="Find player"
							placeholder="Search player by name or number"
							size="lg"
							type="text"
							value={searchValue}
							onChange={(e) => setSearchValue(e.target.value)}
						/>
					</div>
					<div className="playerTableFilterBar">
						<Dropdown
							id="classFilterControl"
							label="Class filter"
							type="inline"
							size="lg"
							titleText=""
							initialSelectedItem={{
								text: "All classes",
							}}
							itemToString={(item) => (item ? item.text : "")}
							onChange={(e) => {
								const selItemStr = e.selectedItem.text;
								const filteredClassStr =
									selItemStr === "Senior"
										? "SR"
										: selItemStr === "Junior"
										? "JR"
										: selItemStr === "Sophomore"
										? "SO"
										: selItemStr === "Freshman"
										? "FR"
										: "";
								setClassFilter(filteredClassStr);
							}}
							items={[
								{
									text: "All classes",
								},
								{
									text: "Senior",
								},
								{
									text: "Junior",
								},
								{
									text: "Sophomore",
								},
								{
									text: "Freshman",
								},
							]}
						/>
						<Dropdown
							id="teamFilterControl"
							label="Team filter"
							type="inline"
							size="lg"
							titleText=""
							initialSelectedItem={{
								text: "All teams",
							}}
							itemToString={(item) => (item ? item.text : "")}
							onChange={(e) => {
								const selItemStr = e.selectedItem.text;
								const filteredTeamStr =
									selItemStr === "Varsity / JV"
										? "vjv"
										: selItemStr === "Freshman"
										? "fr"
										: "";
								setTeamFilter(filteredTeamStr);
							}}
							items={[
								{
									text: "All teams",
								},
								{
									text: "Varsity / JV",
								},
								{
									text: "Freshman",
								},
							]}
						/>
					</div>
					<StructuredListWrapper className="playerTable">
						<StructuredListHead>
							<StructuredListRow>
								<StructuredListCell>#</StructuredListCell>
								<StructuredListCell>Name</StructuredListCell>
								<StructuredListCell>Stats</StructuredListCell>
							</StructuredListRow>
						</StructuredListHead>
						<StructuredListBody>
							{filteredPlayerData.map((playerEl, playerIdx) => {
								return (
									<StructuredListRow key={playerIdx}>
										<StructuredListCell>
											{playerEl.number}
										</StructuredListCell>
										<StructuredListCell>
											{`${playerEl.first_name} ${playerEl.last_name}`}
										</StructuredListCell>
										<StructuredListCell>
											<ul>
												<li>
													<strong>
														{translateClass(
															playerEl.class
														)}
													</strong>
													&nbsp;&nbsp;
													{`${playerEl.height} - ${playerEl.weight} lbs`}
												</li>

												{/* {playerEl.position_o && (
													<li>{`Offense: ${playerEl.position_o}`}</li>
												)}
												{playerEl.position_d && (
													<li>{`Defense: ${playerEl.position_d}`}</li>
												)} */}
											</ul>
										</StructuredListCell>
									</StructuredListRow>
								);
							})}
						</StructuredListBody>
					</StructuredListWrapper>
				</section>
			</Content>
		</div>
	);
}

export default App;
