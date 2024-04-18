import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
	// Here be all your seeds 🌱

//-----------------Users-----------------
	/*const Gon_Freecss = await prisma.Users.upsert({
		where: {id: 1},
		update: {},
		create: 
			{
				id: 1, 
				first_name: "Gon", 
				last_name: "Freecss", 
				email: "gon@freecss.com", 
				password: "hunterxhunter", 
				albums: [],
				photos: [],
			},
	});


	const Ippo_Makanuchi = await prisma.Users.upsert({
		where: {id: 2},
		update: {},
		create: 
			{
				id: 2, 
				first_name: "Ippo", 
				last_name: "Makanuchi", 
				email: "ippo@makanuchi.com", 
				password: "hajimeIppo", 
				albums: [],
				photos: [], 
			},
	});


	const Takamura_Mamoru = await prisma.Users.upsert({
		where: {id: 3},
		update: {},
		create: 
			{
				id: 3, 
				first_name: "Takamura", 
				last_name: "Mamoru", 
				email: "takamura@mamoru.com", 
				password: "ganbareTakamura!", 
				albums: [],
				photos: [],
			},
	});


//-----------------Albums-----------------
	const gons_album = await prisma.Albums.upsert({							// 	GON ALBUM 1
		where: {id: 1},
		title: "Gons Album",
		userId: Gon_Freecss.id,
		comment: "My first ever album!",
	});

	const ippos_selfie_album = await prisma.Albums.upsert({					// 	IPPO ALBUM 2
		where: {id: 2},
		title: "Ippos first Album",
		userId: Ippo_Makanuchi.id,
		comment: "Hey look at me!",
	})

	const ippos_fight_album = await prisma.Albums.upsert({					// 	IPPO ALBUM 3 
		where: {id: 3},
		title: "Ippos fight Album",
		userId: Ippo_Makanuchi.id,
		comment: {},
	})

	const takamura_selfie_album = await prisma.Albums.upsert({				// 	TAKAMURA ALBUM 4
		where: {id: 4},
		title: "Takamuras selfie Album",
		userId: Takamura_Mamoru.id,
		comment: {},
	})

	const takamura_fight_album = await prisma.Albums.upsert({				// 	TAKAMURA ALBUM 5
		where: {id: 5},
		title: "Takamuras fight Album",
		userId: Takamura_Mamoru.id,
		comment: {},
	})

	const takamura_series_album = await prisma.Albums.upsert({				// 	TAKAMURA ALBUM 6
		where: {id: 6},
		title: "Takamuras series Album",
		userId: Takamura_Mamoru.id,
		comment: "Hajime No Ippo Baby!",
	})
	
//-----------------Photos-----------------
	const happy_gon = await prisma.Photos.upsert({																			// GON PHOTOS 1
		where: {id: 1},
		update: {},
		create: {
			id: 1,
			title: "Happy Gon!",
			url: "https://hunterxhunter.fandom.com/wiki/Gon_Freecss?file=HxH2011_EP5_Gon_feeling_excited.png",
			comment: {},
			userId: Gon_Freecss.id,
			album: {
				connect: {id: gons_album.id},
			},
		},
	});

	const pig_gon = await prisma.Photos.upsert({																			// GON PHOTOS 2
		where: {id: 2},
		update: {},
		create: {
			id: 2,
			title: "Boinking a pig on the head",
			url: "https://hunterxhunter.fandom.com/wiki/Gon_Freecss?file=HxH2011_EP6_Gon_strikes_a_Great_Stamp.png",
			comment: "oh boy! look at it's size!",
			userId: Gon_Freecss.id,
			album: {
				connect: {id: gons_album.id},
			},
		},
	});

	const mito_gon = await prisma.Photos.upsert({																			// GON PHOTOS 3
		where: {id: 3},
		update: {},
		create: {
			id: 3,
			title: "My Mito",
			url: "https://hunterxhunter.fandom.com/wiki/Gon_Freecss?file=HxH2011_EP1_Mito_hugs_Gon.png",
			comment: {},
			userId: Gon_Freecss.id,
			album: {
				connect: {id: gons_album.id},
			},
		},
	});

	const remove_gon = await prisma.Photos.upsert({																			// GON PHOTOS 4
		where: {id: 4},
		update: {},
		create: {
			id: 4,
			title: "B&W remove",
			url: "https://hunterxhunter.fandom.com/wiki/Gon_Freecss?file=Chap+17+Gon+Portrait.png",
			comment: "Meh will delete",
			userId: Gon_Freecss.id,
			album: {
				connect: {id: gons_album.id},
			},
		},
	});

	const baby_ippo = await prisma.Photos.upsert({																			// 	IPPO PHOTOS 5
		where: {id: 5},
		update: {},
		create: {
			id: 5,
			title: "A young me",
			url: "https://ippo.fandom.com/wiki/Ippo_Makunouchi?file=Young_Ippo.png",
			comment: "Look at me, so tiny!",
			userId: Ippo_Makanuchi.id,
			album: {
				connect: {id: ippos_selfie_album},
			},
		},
	});

	const drawing_ippo = await prisma.Photos.upsert({																		// 	IPPO PHOTOS 6
		where: {id: 6},
		update: {},
		create: {
			id: 6,
			title: "A fan drawing of me",
			url: "https://ippo.fandom.com/wiki/Ippo_Makunouchi?file=Ippo+Makunouchi+-+Manga.png",
			comment: "A fan made a drawing of me",
			userId: Ippo_Makanuchi.id,
			album: {
				connect: {id: ippos_selfie_album},
			},
		},
	});

	const fighting_ippo = await prisma.Photos.upsert({																		// 	IPPO PHOTOS 7
		where: {id: 7},
		update: {},
		create: {
			id: 7,
			title: "Boom b!tch",
			url: "https://ippo.fandom.com/wiki/Ippo_Makunouchi?file=Ippo%27s_finishing_blow_on_Okita.png",
			comment: "Ha-ha, I won",
			userId: Ippo_Makanuchi.id,
			album: {
				connect: {id: ippos_fight_album},
			},
		},
	});

	const dodging_ippo = await prisma.Photos.upsert({																		// 	IPPO PHOTOS 8
		where: {id: 8},
		update: {},
		create: {
			id: 8,
			title: "Fight!",
			url: "https://ippo.fandom.com/wiki/Ippo_Makunouchi?file=Ippo_vs_Ponchai.png",
			comment: {},
			userId: Ippo_Makanuchi.id,
			album: {
				connect: {id: ippos_fight_album},
			},
		},
	});

	const closeup_takamura = await prisma.Photos.upsert({																	// 	TAKAMURA PHOTOS 9
		where: {id: 9},
		update: {},
		create: {
			id: 9,
			title: "Up close...",
			url: "https://ippo.fandom.com/wiki/Mamoru_Takamura?so=search&file=Mamoru+Takamura+-+Anime.png",
			comment: "... and personal",
			userId: Takamura_Mamoru.id,
			album: {
				connect: {id: takamura_selfie_album},
			},
		},
	});

	const champion_takamura = await prisma.Photos.upsert({																	// 	TAKAMURA PHOTOS 10
		where: {id: 10},
		update: {},
		create: {
			id: 10,
			title: "Champion!",
			url: "https://ippo.fandom.com/wiki/Mamoru_Takamura?so=search&file=TakamuraFirstWin.png",
			comment: {},
			userId: Takamura_Mamoru.id.id,
			album: {
				connect: {id: takamura_selfie_album},
			},
		},
	});

	const badass_takamura = await prisma.Photos.upsert({																	// 	TAKAMURA PHOTOS 11
		where: {id: 11},
		update: {},
		create: {
			id: 11,
			title: "Badass",
			url: "https://ippo.fandom.com/wiki/Mamoru_Takamura?so=search&file=Takamuraleaf.png",
			comment: {},
			userId: Takamura_Mamoru.id,
			album: {
				connect: {id: takamura_selfie_album},
			},
		},
	});

	const kapaow_takamura = await prisma.Photos.upsert({																	// 	TAKAMURA PHOTOS 12
		where: {id: 12},
		update: {},
		create: {
			id: 12,
			title: "Kapaow",
			url: "https://ippo.fandom.com/wiki/Mamoru_Takamura?so=search&file=Takamura_vs_Bonchai.png",
			comment: "Showing everyone how it's done",
			userId: Takamura_Mamoru.id,
			album: {
				connect: {id: takamura_fight_album},
			},
		},
	});

	const takedown_takamura = await prisma.Photos.upsert({																	// 	TAKAMURA PHOTOS 13
		where: {id: 13},
		update: {},
		create: {
			id: 13,
			title: "Takedown!",
			url: "https://ippo.fandom.com/wiki/Mamoru_Takamura?so=search&file=Takamura_downs_Bernard.png",
			comment: {},
			userId: Takamura_Mamoru.id,
			album: {
				connect: {id: takamura_fight_album},
			},
		},
	});

	const the_boys_takamura = await prisma.Photos.upsert({																	// 	TAKAMURA PHOTOS 14
		where: {id: 14},
		update: {},
		create: {
			id: 14,
			title: "Me and the boys",
			url: "https://ippo.fandom.com/wiki/Mamoru_Takamura?so=search&file=Aoki_and_Kiura_talking_about_their_past.png",
			comment: "Hanging out with the boys",
			userId: Takamura_Mamoru.id,
			album: {
				connect: {id: takamura_series_album},
			},
		},
	});

	const armwrestling_takamura = await prisma.Photos.upsert({																// 	TAKAMURA PHOTOS 15
		where: {id: 15},
		update: {},
		create: {
			id: 15,
			title: "Fight!",
			url: "https://ippo.fandom.com/wiki/Mamoru_Takamura?so=search&file=Arm_Wrestling_Match.png",
			comment: {},
			userId: Takamura_Mamoru.id,
			album: {
				connect: [{id: takamura_fight_album}, {id: takamura_series_album}],
			},
		},
	});
	*/
};




main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
