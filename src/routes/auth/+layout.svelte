<script>
	let { children } = $props()
</script>

<div class="mx-auto mt-20 max-w-md rounded-lg border border-zinc-700 p-6">
	{@render children()}
</div>
