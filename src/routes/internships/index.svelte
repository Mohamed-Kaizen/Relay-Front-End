<section class="text-gray-700 body-font">
	<div class="container px-5 py-24 mx-auto">
		<div class="flex flex-wrap -m-4">
			{#each {length: 19} as _}
				<div
					class="container mx-auto max-w-sm rounded-lg overflow-hidden
					shadow-lg my-2 bg-white">
					<div
						class="z-10"
						style="clip-path: polygon(0 0, 100% 0, 100% 100%, 0
						calc(100% - 5vw));">
						<img
							class="w-full"
							src="https://images.unsplash.com/photo-1505033575518-a36ea2ef75ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=333&q=80&w=640"
							alt="@johndoe" />
						<div
							class="text-center absolute w-full"
							style="bottom: 4rem">
							<p
								class="text-white tracking-wide uppercase text-lg
								font-bold">
								John Doe
							</p>
							<p class="text-gray-400 text-sm">@johndoe</p>
						</div>
					</div>
					<div
						class="relative flex justify-between items-center
						flex-row px-6 z-11 -mt-10">
						<p class="flex items-center text-gray-400">
							<span
								class="inline-block w-3 h-3 bg-green-500
								rounded-full mr-2"></span>
							online
						</p>
						<button
							class="p-4 bg-red-600 rounded-full hover:bg-red-500
							focus:bg-red-700 transition ease-in duration-200
							focus:outline-none">
							<svg
								viewBox="0 0 20 20"
								enable-background="new 0 0 20 20"
								class="w-6 h-6">
								<path
									fill="#FFFFFF"
									d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
							</svg>
						</button>
					</div>
					<div class="pt-6 pb-8 text-gray-600 text-center">
						<p>Fullstack Developer</p>
						<p class="text-sm">Coding from Planet Earth</p>
					</div>

					<div
						class="pb-10 uppercase text-center tracking-wide flex
						justify-around">
						<div class="posts">
							<p class="text-gray-400 text-sm">Posts</p>
							<p class="text-lg font-semibold text-blue-300">76</p>
						</div>
						<div class="followers">
							<p class="text-gray-400 text-sm">Followers</p>
							<p class="text-lg font-semibold text-blue-300">
								964
							</p>
						</div>
						<div class="following">
							<p class="text-gray-400 text-sm">Following</p>
							<p class="text-lg font-semibold text-blue-300">34</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
