<template>
<header>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <logout-dropdown></logout-dropdown>
            </div>
        </div>
    </div>
</header>
</template>
<script>
import LogoutDropdown from './LogoutDropdown'
export default {
    components: { LogoutDropdown }
}
</script>
<style>
header {
	background-color: #ae0918;
}
</style>