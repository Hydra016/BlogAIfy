<template>
    <footer class="bg-[#121212] text-gray-400 border-t border-[#2a2a2a]">
        <div class="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-8">
            <div class="flex flex-col gap-2">
                <img width="170" height="170" src="@/assets/Logo.png" />
                <p class="text-sm text-gray-500 max-w-xs">
                    Empowering creators with modern tools and a beautiful UI — built for speed and simplicity.
                </p>
            </div>

            <div class="flex gap-12 flex-wrap">
                <div class="flex flex-col gap-2">
                    <h4 class="text-white text-sm font-semibold">Product</h4>
                    <a href="#" class="hover:text-[#FFD11A] text-sm transition">Features</a>
                    <a href="#" class="hover:text-[#FFD11A] text-sm transition">Pricing</a>
                    <a href="#" class="hover:text-[#FFD11A] text-sm transition">Blog</a>
                </div>

                <div class="flex flex-col gap-2">
                    <h4 class="text-white text-sm font-semibold">Company</h4>
                    <a href="#" class="hover:text-[#FFD11A] text-sm transition">About</a>
                    <a href="#" class="hover:text-[#FFD11A] text-sm transition">Careers</a>
                    <a href="#" class="hover:text-[#FFD11A] text-sm transition">Contact</a>
                </div>

                <div class="flex flex-col gap-2">
                    <h4 class="text-white text-sm font-semibold">Legal</h4>
                    <a href="#" class="hover:text-[#FFD11A] text-sm transition">Privacy Policy</a>
                    <a href="#" class="hover:text-[#FFD11A] text-sm transition">Terms of Service</a>
                </div>
            </div>
        </div>

        <div class="border-t border-[#2a2a2a] text-center py-6 text-xs text-gray-500">
            &copy; {{ new Date().getFullYear() }} BlogAIfy. All rights reserved.
        </div>
    </footer>
</template>
